import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
    render() {
        return (
            <header className="container-fluid bg-dark">
                <div className="navbar navbar-light bg-light">
                    <Link className="navbar-brand" to="/">
                        <p>IRC</p>
                    </Link>
                </div>
            </header>
        );
    }
}

export default Header;