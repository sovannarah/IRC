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
const rooms = ["public"];

io.on('connection', (sockets) => {
    let room = "public";
    sockets.on('login', (nickname) => {
        // sockets.handshake.session.userdata = nickname;
        // sockets.handshake.session.save();
        let user = {id: id(), nickname: nickname}; 
        users.push(user);
        sockets.emit('getUser', user);
        sockets.broadcast.emit('getMessages', [{mess: nickname + ' vient de rejoindre le canal'}])
        
    })

    sockets.on('sendMessage', (message) => {
        sockets.emit('getMessages', message)
        sockets.to(room).emit('getMessages', message)
    })

    sockets.on('command', (cmd) => {   
        switch(cmd[0]) {
            case 'users': 
            sockets.emit('getMessages', users);
            break;
            case 'create': 
            sockets.join(cmd[1]);
            let createMess = 'Le canal ' + cmd[1] + ' vient d\'etre creer'
            sockets.emit('getMessages', [{mess: createMess}] )
            sockets.broadcast.emit('getMessages', [{mess: createMess}] )
            break;
            case 'join':
            sockets.join(cmd[1]);
            room = cmd[1]
            sockets.emit('roomName', cmd[1])
            break;
            default:
                console.log('break')
        }
    })
})


