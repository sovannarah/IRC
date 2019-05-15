import React, { Component } from 'react';
import { sendMessage, getMessages } from '../api';
import TextField from '@material-ui/core/TextField';

class Chat extends Component {

    constructor(props) {
        super(props);
            this.state = { 
                message: '',
                messages: []
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

    handleSubmit(event) {
        event.preventDefault();
        sendMessage(sessionStorage.getItem('name') ,this.state.message)
        this.setState({message: ''})
    }

    render() {
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
                <form onSubmit={this.handleSubmit.bind(this)} className="d-flex row">
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