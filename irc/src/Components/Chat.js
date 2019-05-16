import React, { Component } from 'react';
import { sendMessage, getMessages, sendCommand } from '../api';
import TextField from '@material-ui/core/TextField';

class Chat extends Component {

    constructor(props) {
        super(props);
            this.state = { 
                message: '',
                messages: [],
                orders: ["nick", "list", "create", "delete", "join",
                         "part", "users", "msg"]
            }

            this.handleChange = this.handleChange.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
            
            getMessages((err, gMessages) => {
                this.setState({messages : [...this.state.messages,...gMessages]})
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
            sendMessage(sessionStorage.getItem('name') ,this.state.message);
        } else if (checkCmd === false) {
            sendMessage('Error', "Cette commande n'existe pas");
        } else {
            sendCommand(checkCmd);
        }
        this.setState({message: ''});
    }

    render() {
        // sessionStorage.clear()
        return (
            <div className="container-fluid chat h-75">
                <div className="chat col-12 h-75 mt-5 mb-5 border">
                    {this.state.messages.map((message, index) => (
                        <div className="row" key={index}>
                            <div className="col-3">
                                {message.nickname}
                            </div>
                            <div className="col-9 d-flex justify-content-start">
                                {message.mess}
                            </div>
                        </div>
                    ))}
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