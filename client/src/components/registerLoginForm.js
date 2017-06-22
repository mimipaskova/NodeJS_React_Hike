import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

class RegisterLoginForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '', 
            password: ''
        };

        this.onChange = this.onChange.bind(this);
        this._confirm = this._confirm.bind(this);
    }

    _confirm() {
        var user = {
            username: this.state.username,
            password: this.state.password
        };
        console.log(this.state);
        this.props.onConfirm(user);
    }

    onChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    render() {
        return (
        <div className="form">

            <form>
                <TextField type="text" name="username" value={this.state.username} onChange={this.onChange} />
                <br />
                <TextField type="password" name="password" value={this.state.password} onChange={this.onChange}/>
                <br />
                <RaisedButton type="button" onClick={this._confirm}>{this.props.children}</RaisedButton>
            </form>
        </div>
        );
    }
}

export default RegisterLoginForm;