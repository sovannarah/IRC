import openSocket from 'socket.io-client';
const  socket = openSocket('http://localhost:8000');

function login(nickname) {
    socket.emit('login', nickname)
}

function sendMessage(user, message) {
    socket.emit('sendMessage', [{nickname: user, mess:message}])
}

function getMessages(display) {
    socket.on('getMessages', messages => display(null, messages))
}

export { login, sendMessage, getMessages };