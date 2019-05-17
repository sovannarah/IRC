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
const rooms = ["public", "test"];

//////////////////////////////////////////////////////
// io.of('/chat').on('connection', function(sockets){
//     console.log('enter')
// })


///////////////////////////////////////////////////////
io.on('connection', (sockets) => {
    let room = "";
    sockets.on('login', (nickname) => {
        // sockets.handshake.session.userdata = nickname;
        // sockets.handshake.session.save();
        let user = {id: id(), nickname: nickname}; 
        users.push(user);
        sockets.emit('getUser', user);
        sockets.broadcast.emit('getMessages', [{mess: nickname + ' vient de rejoindre le canal'}])
        
    })

    sockets.on('sendMessage', (message) => {
        console.log(message["room"])
        // sockets.broadcast.emit('getMessages', message);
        sockets.to(room).emit('getMessages', message)
    })

    sockets.on('command', (cmd) => {   
        switch(cmd[0]) {
            case 'users': 
            sockets.emit('getMessages', users);
            break;
            case 'create': 
            sockets.join(cmd[1]);
            break;
            case 'join':
            sockets.join(cmd[1]);
            room = cmd[1]
            sockets.emit('roomName', cmd[1])
            break;
            default:
                console.log('break')
        }
        // if(cmd[0] === 'users'){
        //     sockets.emit('getMessages', users)
        // } else if (cmd[0] === 'create'){
        //     sockets.join(cmd[1])
        //     console.log(sockets.rooms)
        // } else if ()
    })
})

rooms.forEach(function(room) {
    io.of('/' + room).on('connection', (sockets) => {
        sockets.emit('getMessages', [{mess: 'vous avez rejoint le canal: ' + room}])
    })
})


// rooms.forEach(room => {
    // io.of('/').on('connection', (sockets) => {
    //     sockets.emit('getMessages', [{mess: 'vous avez rejoint le canal: ' + room}])
    //     sockets.on('login', (nickname) => {
    //         let user = {id: id(), nickname: nickname}; 
    //         users.push(user);
    //         sockets.emit('getUser', user);
    //         sockets.broadcast.emit('getMessages', [{mess: nickname + ' vient de rejoindre le canal'}])
            
    //     })

        
    //     sockets.on('sendMessage', (message) => {
    //         sockets.broadcast.emit('getMessages', message);
    //         sockets.emit('getMessages', message)
    //     })

    //     sockets.on('command', (cmd) => {  
    //         switch(cmd) {
    //             case "users":
    //                 sockets.emit('getMessages', users);
    //                 break;
    //             // case "join":
    //             //     room = "public"
    //             //     break;
    //             default:
    //                 console.log('default') 
    //         } 
            
    //     })

    // })
// })