const io = require('socket.io')().listen(8000);
const express = require('express');
const id = require('uniqid')
const app = express();
const session = require('express-session')({
    secret : " mon secret " , 
    resave : true , 
    saveUninitialized : true 
})
const sharedsession = require('express-socket.io-session')

app.use(session);

io.use(sharedsession (session, { 
    autoSave : true
})); 

const users = [];
let user = {};
const rooms = [];

io.on('connection', (sockets) => {
    let room = "public";
    sockets.on('login', (nickname) => {
        // sockets.handshake.session.userdata = nickname;
        // sockets.handshake.session.save();
        user = {id: id(), nickname: nickname}; 
        users.push(user);
        sockets.emit('getUser', user);
    })

    sockets.on('sendMessage', (message) => {
        sockets.emit('getMessages', message)
        sockets.to(room).emit('getMessages', message)
    })

    sockets.on('command', (cmd) => {   
        switch(cmd[0]) {
            case 'users': 
            let userList = "";
                for(let i = 0; i < users.length; i++) {
                    userList += users[i].nickname +  '\n';
                }
                sockets.emit('getMessages', [{nickname: 'Info', mess: userList}])
            break;
            case 'create': 
                sockets.join(cmd[1]);
                let createMess = 'Le canal ' + cmd[1] + ' vient d\'etre creer';
                rooms.push({roomName: cmd[1]});
                sockets.emit('getMessages', [{nickname: 'Info', mess: createMess}]);
                sockets.broadcast.emit('getMessages', [{nickname: 'Info', mess: createMess}]);
            break;
            case 'join':
                sockets.join(cmd[1]);
                room = cmd[1]
                sockets.emit('getRoom', room);
                sockets.emit('getMessages', [{nickname: 'Info', mess:  'Vous avez rejoint le canal ' + cmd[1]}]);
                sockets.to(room).emit('getMessages', [{nickname: 'Info', mess: user.nickname + ' vous a rejoint sur le canal'}]);
            break;
            case 'part':
                sockets.leave(cmd[1]);
                sockets.emit('getMessages', [{nickname: 'Info', mess: 'Vous avez quitte le canal ' + cmd[1]}]);
                sockets.to(room).emit('getMessages', [{nickname: 'Info', mess: user.nickname + ' a quitte le canal'}]);
            break;
            case "msg":

            break;
            case 'nick':

            break;
            case 'delete':

            break;
            case "list": 
                let roomList = "";
                for(let i = 0; i < rooms.length; i++) {
                    roomList += rooms[i].roomName +  '\n';
                }
                sockets.emit('getMessages', [{nickname: 'Info', mess: roomList}])
            break;
            default:
                console.log('break')
        }
    })
})


