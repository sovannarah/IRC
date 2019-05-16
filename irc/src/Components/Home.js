import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import { login, sessionSave } from '../api';

class Home extends Component {


    constructor(props) {
        super(props);
        this.state = {
            nickname: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    state = {
        timestamp: 'no timestamp yet'
    };

    handleChange(event) {
        this.setState({nickname: event.target.value})
    }

    async handleSubmit(event) {
        login(this.state.nickname);
    }

    render() {
        sessionSave((res)=> {
            sessionStorage.setItem('name', res)
        })
        
        return(
            <section className="h-100 d-flex">
                <div className="h-50 col-3 d-flex flex-column m-auto">
                    <h1>Connect to IRC</h1>
                    <form className="h-50 col-12 d-flex flex-column m-auto" onSubmit={this.handleSubmit.bind(this)}>
                        <TextField
                        id="outlined-name"
                        label="Nickname"
                        className="mb-4"
                        margin="normal"
                        variant="outlined"
                        onChange={this.handleChange}
                        />
                        <Fab type='submit' variant="extended" aria-label="Delete" >
                            Login
                        </Fab>
                    </form>
                    <p className="App-intro">
                    </p>
                </div>
            </section>
        );  
    }
}

export default Home;