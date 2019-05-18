import openSocket from 'socket.io-client';
const  socket = openSocket('http://localhost:8000/');

function login(nickname) {
    socket.emit('login', nickname);
    
}

function sessionSave(display) {
    socket.on('getUser', messages => display(messages));
    
}

function sendMessage(user, message) {
    socket.emit('sendMessage', [{nickname: user, mess:message}]);
}

function getMessages(display) {
    socket.on('getMessages', messages =>{
        console.log(messages);
        display(null, messages);
    });
}

function sendCommand(cmd) {
    socket.emit('command', cmd);
}



export { login, sessionSave, sendMessage, getMessages, sendCommand };