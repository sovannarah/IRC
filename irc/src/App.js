import React from 'react';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import Header from './Components/Header';
import Chat from './Components/Chat';

import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        nickname: "",
        submit: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({nickname: event.target.value})
  }

  async handleSubmit(event) {
      if(this.state.nickname !== ""){
        this.setState({submit: true})
      }
  }

  render() {
  if(this.state.submit === true) {
    return(
          <Chat nickname={this.state.nickname} /> 
    );
  } else {
    return (
        <div className="App">
          <Header button={false}/>
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
        </div>
      );
  }
  }
}

export default App;
