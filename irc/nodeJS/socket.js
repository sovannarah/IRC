const io = require('socket.io')().listen(8000);

const users = [];
let user = {};
const rooms = [];

io.on('connection', (sockets) => {
    let room = "";
    sockets.on('login', (nickname) => {
        console.log(sockets.rooms)
        user = {id: sockets.id, nickname: nickname}; 
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
                let roomExist = false;
                for(let c = 0 ; c < rooms.length; c++) {
                    if(cmd[1] === rooms[c].roomName) {
                        roomExist = true;
                    } 
                }
                if(roomExist === false) {
                    sockets.join(cmd[1]);
                    let createMess = 'Le canal ' + cmd[1] + ' vient d\'etre creer';
                    rooms.push({adminId: user.id, roomId: sockets.id, roomName: cmd[1]});
                    sockets.emit('getMessages', [{nickname: 'Info', mess: createMess}]);
                    sockets.broadcast.emit('getMessages', [{nickname: 'Info', mess: createMess}]);
                } else {
                    let msgError = 'Ce canal existe deja! Utiliser la commande /join si vous souhaitez le rejoindre!';
                    sockets.emit('getMessages', [{nickname: 'Error', mess: msgError}])
                }
                console.log(sockets.rooms)
               
            break;
            case 'join':
                sockets.join(cmd[1]);
                room = cmd[1];
                sockets.emit('getRoom', room);
                sockets.emit('getMessages', [{nickname: 'Info', mess:  'Vous avez rejoint le canal ' + cmd[1]}]);
                sockets.to(room).emit('getMessages', [{nickname: 'Info', mess: user.nickname + ' vous a rejoint sur le canal'}]);
            break;
            case 'part':
                if(cmd[1] === room) {
                    sockets.leave(cmd[1])
                    sockets.emit('getRoom', '');
                    sockets.emit('getMessages', [{nickname: 'Info', mess: 'Vous avez quitte le canal ' + cmd[1]}]);
                    sockets.to(room).emit('getMessages', [{nickname: 'Info', mess: user.nickname + ' a quitte le canal'}]);
                    room = "";
                } else {
                    sockets.emit('getMessages', [{nickname: 'Error', mess: 'Vous ne pouvez pas quitter un autre canal que l\'actuel : ' + room}]);
                }
            break;
            case "msg":
                for(let m = 0; m < users.length; m++) {
                    if(cmd[1] === users[m].nickname) {
                        console.log(users[m].id)
                        sockets.broadcast.to(users[m].id).emit('getMessages', [{nickname: user.nickname, mess:'test'}])
                    }
                }
                
            break;
            case 'nick':
                for(let n = 0 ; n < users.length; n++) {
                    console.log(users[n])
                    if(user.id === users[n].id) {
                        console.log(users[n])
                        users[n] = {id: user.id, nickname: cmd[1]};
                        sockets.emit('getMessages', [{nickname: 'Info', mess: 'Vous avez changer de nom en : ' + cmd[1]}])
                        sockets.broadcast.emit('getMessages', [{nickname: 'Info', mess: user.nickname + ' a changer de nom en : ' + cmd[1]}])
                        user = {id: user.id, nickname: cmd[1]}
                        sockets.emit('getUser', user);
                    }
                }
            break;
            case 'delete':
                delete sockets.rooms[cmd[1]];
                console.log(sockets.rooms)
            break;
            case "list": 
                let roomList = "";
                for(let i = 0; i < rooms.length; i++) {
                    if (cmd[1]) {
                        let mim = true;
                        for(let y = 0 ; y < cmd[1].length; y++) {
                            if (cmd[1][y] !== rooms[i].roomName[y]) {
                                mim = false;
                            }
                        }
                        if(mim === true ) {
                            roomList += rooms[i].roomName +  '\n';
                        }
                    } else {
                        roomList += rooms[i].roomName +  '\n';
                    }
                }
                if(roomList === "") {
                    sockets.emit('getMessages', [{nickname: 'Error', mess: 'Aucune liste trouvee'}]);
                } else {
                    sockets.emit('getMessages', [{nickname: 'Info', mess: roomList}]);
                }
            break;
            default:
                console.log('break')
        }
    })
})


