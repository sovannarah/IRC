import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './Components/Home';
import Header from './Components/Header';
import Channels from './Components/Channels';
import Chat from './Components/Chat';

import './App.css';

function App() {
  if(sessionStorage.getItem('name')) {
    return(
        <div className="App">
          <BrowserRouter>
            <Header />
            <Switch>
              <Route exact path='/' component={Chat}/>
            </Switch>
          </BrowserRouter>
        </div>
    );
  } else {
    return (
        <div className="App">
          <BrowserRouter>
            <Header />
            <Switch>
              <Route exact path='/' component={Home}/>
            </Switch>
          </BrowserRouter>
        </div>
      );
  }
}

export default App;
