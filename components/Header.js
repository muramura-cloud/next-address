import React, { Component } from 'react';

class Header extends Component {
    render() {
        return (
            <header className='header'>
                <h1 className='header-h1'>{this.props.header}</h1>
            </header>
        );
    }
}

export default Header;
