import React, { Component } from 'react';
import axios from 'axios';
import RegisterLoginForm from './registerLoginForm';
import { Link } from 'react-router-dom';

class Login extends Component {

    constructor(props) {
        super(props);

        this.loginUser = this.loginUser.bind(this);
    }

    loginUser(user) {
        console.log('Loginnnnnn', user);
        axios.post('/api/login', user)
        .then(res => console.log(res))
        .then(() => this.props.history.push('/profile'))
        .catch(error => console.log(error));
    }

    render() {
        return (
        <div className="App">
            <RegisterLoginForm onConfirm={this.loginUser}>
                Login
            </RegisterLoginForm>
        </div>
        );
    }
}

export default Login;
