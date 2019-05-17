import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Logout from '../Images/logout.png';

class Header extends Component {
    
    logout() {
        sessionStorage.clear();
    }

    render() {

        let buttonLogout ;
        if (sessionStorage.getItem('name')) {
            buttonLogout = <form onSubmit={this.logout}>
                                <button type="submit">
                                    <img src={Logout} alt="logout"/>
                                </button>
                            </form>;
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