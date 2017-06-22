import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

class Welcome extends Component {

    render() {
        return (
        <div>
            <Menu>
                <MenuItem primaryText="Login" containerElement={<Link to="/login" />} />
                <MenuItem primaryText="Register" containerElement={<Link to="/register" />} />
                <MenuItem primaryText="Stories" containerElement={<Link to="/story" />} />
            </Menu>
            <div className="top-menu">
            <ul>
                <li>
                <Link to="/login">Login</Link>
                </li>
                <li>
                <Link to="/register">Register</Link>
                </li>
                <li>
                <Link to="/story">Stories</Link>
                </li>
            </ul>
            </div>
      </div>
        );
    }
}

export default Welcome;
