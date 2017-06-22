import React, { Component } from 'react';
import axios from 'axios';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

class EditProfile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: ''
        };

        this.onChange    = this.onChange.bind(this);
        this.editProfile = this.editProfile.bind(this);
    }
    componentDidMount() {
    }

    onChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    editProfile() {
        var profile = {
            email: this.state.email
        }
        axios.put('/api/me', profile)
        .then(res => console.log(res))
        .catch(error => console.log(error));
    }

    render() {
        return (
            <div>
                <TextField type="text" name="title" value={this.state.email} onChange={this.onChange} />
                <br />
                <RaisedButton type="button" onClick={this.editProfile}>Edit profile</RaisedButton>
            </div>
        )
    }
}

export default EditProfile