import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import logo from '../logo.png';
import '../index.css';

class Welcome extends Component {

    render() {
        return (
        <div>
            <Menu className="menu">
                <MenuItem primaryText="Login" containerElement={<Link to="/login" />} />
                <MenuItem primaryText="Register" containerElement={<Link to="/register" />} />
            </Menu>
            <img className="img-logo" src={logo} alt="Logo" />
        </div>
        );
    }
}

export default Welcome;
