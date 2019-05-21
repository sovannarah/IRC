import React, { Component } from 'react';
import {login, sendMessage, getMessages, sendCommand, getRoom, sessionSave, user } from '../api';
import TextField from '@material-ui/core/TextField';
import {Emojione} from 'react-emoji-render';
import parser from 'bbcode-to-react';
// import stayScrolled from 'react-stay-scrolled';
// import Messages from './Messages';

class Chat extends Component {

    constructor(props) {
        super(props);
            this.state = { 
                message: '',
                messages: [],
                room: '',
                orders: ["nick", "list", "create", "delete", "join",
                         "part", "users", "msg"]
            }
            this.handleChange = this.handleChange.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
            
            if(this.props.nickname) {
                login(this.props.nickname); 
            }
            
            getMessages((err, gMessages) => {
                this.setState({messages : [...this.state.messages,...gMessages]})
            })

            getRoom(curRoom =>{
                this.setState({room: curRoom})
            })
    }

    
    handleChange(event) {
        this.setState({ message : event.target.value })
    }

    checkCmd() {
        let arrayString = this.state.message.split(' ');
        let orders = this.state.orders;
        let result = '';
        if(arrayString[0][0] === '/') {
            let cmdName = arrayString[0].substr(1, arrayString[0].length);
            for(let i = 0; i < orders.length; i++) {
                if(cmdName === orders[i]){
                    return cmdName;
                } else {
                    result = false;
                };
            }
            return result;
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        let checkCmd = this.checkCmd();
        if(checkCmd === undefined) {
            sendMessage(sessionStorage.getItem('name'), this.state.message);
        } else if (checkCmd === false) {
            sendMessage('Error', "Cette commande n'existe pas");
        } else {
            let arrayString = this.state.message.split(' ');
            if(checkCmd === 'msg') {
                user({id: sessionStorage.getItem('id') , nickname: sessionStorage.getItem('name')})
                sendCommand([checkCmd, arrayString[1], arrayString]); 
            } else {
                user({id: sessionStorage.getItem('id') , nickname: sessionStorage.getItem('name')})
                sendCommand([checkCmd, arrayString[1]]); 
            }    
        }
        this.setState({message: ''});
    }

    render() {
        sessionSave((res)=> {
            sessionStorage.setItem('id', res.id);
            sessionStorage.setItem('name', res.nickname);
        })
        console.log(sessionStorage.getItem('name'), sessionStorage.getItem('id'))
        return (
            <div className="container-fluid chat h-75">
                <div className="chat col-12 h-75 mt-5 mb-5 border ">
                    {this.state.messages.map((message, index) => {
                        let bgColor;
                        if(message.nickname !== 'Info' && message.nickname !== 'Error') {
                            bgColor = (index%2 === 0) ? 'bg-light' : 'bg-secondary-white'
                        } else {
                            switch (message.nickname) {
                                case 'Info':
                                bgColor = "bg-info";
                                break;
                                case 'Error':
                                bgColor = 'bg-danger';
                                break;
                                default: 
                                bgColor = "";
                            }
                        }
                        return  <div className={`row ${bgColor}`} key={index}>
                                    <div className="col-3">
                                        {message.nickname}
                                    </div>
                                    <Emojione text={message.mess} className="col-9 d-flex justify-content-start">    
                                    </Emojione>
                                </div>
                    })}
                </div>
                <form onSubmit={this.handleSubmit} className="d-flex row">
                    <div className="form-group col-10 m-auto"> 
                        <TextField
                        id="outlined-name"
                        label="Message"
                        className="text col-12"
                        margin="normal"
                        variant="outlined"
                        value={this.state.message}
                        onChange={this.handleChange}
                        />
                    </div>
                </form>
            </div>
        );
    }
}

export default Chat;