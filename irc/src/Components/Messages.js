import React, { Component } from 'react';
import stayScrolled from 'react-stay-scrolled';

class Messages extends Component {
    render() {
        return (
            <stayScrolled component='div'>
                    {this.props.messages.map((message, index) => {
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
                                    <div className="col-9 d-flex justify-content-start">
                                        {message.mess}
                                    </div>
                                </div>
                    })}
            </stayScrolled>
        );
    }
}

export default Messages;