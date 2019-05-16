const io = require('socket.io')();
const express = require('express');
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



io.on('connection', (sockets) => {

    sockets.on('login', (nickname) => {
        // sockets.handshake.session.userdata = nickname;
        // sockets.handshake.session.save();
        sockets.emit('getUser', nickname);
    })

    sockets.on('sendMessage', (message) => {
        sockets.broadcast.emit('getMessages', message);
        sockets.emit('getMessages', message)
    })
})

io.of('/channelTest').on('connection', (socket) => {
    socket.broadcast.emit('channelMessages');
})

io.listen(8000)