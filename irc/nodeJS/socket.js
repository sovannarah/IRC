const io = require('socket.io')().listen(8000);
const id = require('uniqid');
const users = [];
let user = {};
const rooms = [];
const curRoom = [];


io.on('connection', (sockets) => {
    
    function roomsExist(cmd) {
        let roomExist = false;
        for(let c = 0 ; c < rooms.length; c++) {
            if(cmd[1] === rooms[c].roomName) {
                roomExist = true;
            } 
        }
        return roomExist;
    }
    
    function sendInfo(msgAll, msgMe) {
        // var msgE = (msgMe === null) ? msgTo : msgMe; 
        sockets.emit('getMessages', [{nickname: 'Info', mess: msgMe}]);
        sockets.broadcast.emit('getMessages', [{nickname: 'Info', mess: msgAll}]);
    }
    
    function spliceRoom() {
        for(let c = 0; c < curRoom.length; c++) {
            if(user.id === curRoom[c][1].id) {
                curRoom.splice(c, c);
            }
        }
        sockets.emit('getRoom', '');
    }
    function createRoom(cmd) {
        let roomExist = roomsExist(cmd);
        if(roomExist === false) {
            sockets.join(cmd[1]);
            let msgCreateCanal = 'Le canal ' + cmd[1] + ' vient d\'etre creer';
            rooms.push({adminId: user.id, roomId: id(), roomName: cmd[1]});
            sendInfo(msgCreateCanal, msgCreateCanal);
        } else {
            let msgError = 'Ce canal existe deja! Utiliser la commande /join si vous souhaitez le rejoindre!';
            sockets.emit('getMessages', [{nickname: 'Error', mess: msgError}])
        }
    }
    
    function joinRoom(cmd) {
        let roomExist = roomsExist(cmd);
        if(roomExist === true) {
            sockets.to(room).emit('getMessages', [{nickname: 'Info', mess: user.nickname + ' a quitte le canal'}]);
            if(room !== "") {
                sockets.leave(room)
                spliceRoom();
            }
            sockets.join(cmd[1]);
            room = cmd[1];
            curRoom.push([room, sockets]);
            sockets.emit('getRoom', room);
            sockets.emit('getMessages', [{nickname: 'Info', mess:  'Vous avez rejoint le canal ' + cmd[1]}]);
            sockets.to(room).emit('getMessages', [{nickname: 'Info', 
                                                    mess: user.nickname + ' vous a rejoint sur le canal'}]);
        } else {
            sockets.emit('getMessages', [{nickname: 'Error', mess: 'Le canal choisi n\'existe pas'}]);
        }
    }
    
    
    function partRoom(cmd) {
        if(cmd[1] === room) {
            sockets.leave(cmd[1]);
            spliceRoom();
            sockets.emit('getRoom', '');
            let msgMe = 'Vous avez quitte le canal ' + cmd[1];
            let msgAll = user.nickname + ' a quitte le canal';
            sockets.emit('getMessages', [{nickname: 'Info', mess: msgMe}]);
            sockets.to(room).emit('getMessages', [{nickname: 'Info', mess: msgAll}]);
            room = "";
        } else {
            let msgPartError = 'Vous ne pouvez pas quitter un autre canal que l\'actuel : ' + room;
            sockets.emit('getMessages', [{nickname: 'Error', mess: msgPartError}]);
        }
    }
    
    function privateMsg(cmd) {
        let privateMsg = "";
        for(let r = 2; r < cmd[2].length; r++) {
            privateMsg += cmd[2][r] + " ";
        }
        for(let m = 0; m < users.length; m++) {
            if(cmd[1] === users[m].nickname) {
                sockets.emit('getMessages', [{nickname: user.nickname, mess: privateMsg}]);
                sockets.to(users[m].id).emit('getMessages', [{nickname: user.nickname, mess: privateMsg}]);
            }
        }
    }
    
    function changeNkn(cmd) {
        for(let n = 0 ; n < users.length; n++) {
            if(user.id === users[n].id) {
                users[n] = {id: user.id, nickname: cmd[1]};
                let msgMe = 'Vous avez changer de nom en : ' + cmd[1];
                let msgAll = user.nickname + ' a changer de nom en : ' + cmd[1];
                sendInfo(msgAll, msgMe)
                user = {id: user.id, nickname: cmd[1]}
                sockets.emit('getUser', user);
            }
        }
    }

    function deleteRoom(cmd) {
        let deleteRoom = {};
        let index = 0;
        for(let d = 0; d < rooms.length; d++) {
            if(rooms[d].roomName === cmd[1]) {
                deleteRoom = rooms[d];
                index = d;
            }
        }
        if(user['id'] === deleteRoom['adminId']) {
            rooms.splice(index);
            delete sockets.rooms[cmd[1]];
            let deleteMess = 'Le canal ' + cmd[1] + ' vient d\'etre supprimer';
            sendInfo(deleteMess, deleteMess);
        } else {
            let deleteMsgError = 'Vous devez etre admin de se canal pour le supprimer';
            sockets.emit('getMessages', [{nickname: 'Error', mess: deleteMsgError}]);
        }
    }
    
    function listUsrRoom() {
        let userList = "";
        for(let y = 0; y < curRoom.length; y++) {
            if(room === curRoom[y][0]){
                userList += curRoom[y][1].nickname + "\n";
            }
        }
        if(userList === "") {
            let errorMsg = 'Aucun utilisateur trouvee';
            sockets.emit('getMessages', [{nickname: 'Info', mess: errorMsg}]);
        } else {
            sockets.emit('getMessages', [{nickname: 'Info', mess: userList}]);
        }
    }
    
    function listRoom(cmd) {

        console.log(curRoom[0][0])
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
    }
    let room = "";
    let tabCmd = {
        users: listUsrRoom,
        create: createRoom,
        join: joinRoom,
        part: partRoom, 
        msg: privateMsg,
        nick: changeNkn,
        delete: deleteRoom,
        list: listRoom,
    }
    
    sockets.on('login', (nickname) => {
        sockets.nickname = nickname;
        user = {id: sockets.id, nickname: nickname}; 
        users.push(sockets);
        sockets.emit('getUser', user);
        
    })

    sockets.on('sendMessage', (message) => {
        sockets.emit('getMessages', message)
        sockets.to(room).emit('getMessages', message);
    })


    sockets.on('currUser', (usr) => {
        user = usr;
    })

    sockets.on('command', (cmd) => {  
        for(let values in tabCmd) {
            if(cmd[0] === values) {
                tabCmd[values](cmd);
            }
        }
    })
})


