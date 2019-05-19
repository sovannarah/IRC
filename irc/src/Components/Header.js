import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Logout from '../Images/logout.png';

class Header extends Component {
    
    logout() {
        sessionStorage.clear();
    }

    render() {

        let buttonLogout;
        if (sessionStorage.getItem('name')) {
            buttonLogout = <label className="d-flex">
                            <p className="mt-auto mb-auto mr-2">Deconnexion</p>
                                <form onSubmit={this.logout}>
                                    <button type="submit">
                                        <img src={Logout} alt="logout"/>
                                    </button>
                                </form>
                            </label>;
        }
        
        return (
            <header className="container-fluid bg-dark">
                <div className="navbar navbar-light bg-light">
                    <Link className="navbar-brand" to="/">
                        <p>IRC</p>
                    </Link>
                    {buttonLogout}
                </div>
            </header>
        );
    }
}

export default Header;