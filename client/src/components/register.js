import React, { Component } from 'react';
import axios from 'axios';
import RegisterLoginForm from './registerLoginForm';

class Register extends Component {

    constructor(props) {
        super(props);

        this.registerUser = this.registerUser.bind(this);
    }

    registerUser(user) {
        console.log(user);
        axios.post('/api/register', {
            username: user.username,
            password: user.password
        })
        .then(res => console.log(res))
        .then(() => this.props.history.push('/login'))
        .catch(error => console.log(error));
    }

    render() {
        return (
        <div className="App">
            <RegisterLoginForm onConfirm={this.registerUser}>
                Register
            </RegisterLoginForm>
        </div>
        );
    }
}

export default Register;



