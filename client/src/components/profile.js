import React, { Component } from 'react';
import axios from 'axios';
import Story from './story';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router-dom';
import TextField from 'material-ui/TextField';

class Profile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userProfile: '',
            stories: [],
            content: '',
            email: ''
        };

        this.getStories = this.getStories.bind(this);
        this.getProfile = this.getProfile.bind(this);
        this.onChange    = this.onChange.bind(this);
        this.editProfile = this.editProfile.bind(this);
        this.fetchStories = this.fetchStories.bind(this);
        this.logoutUser = this.logoutUser.bind(this);
    }

    componentDidMount() {
        console.log(this.state);
       this.getProfile();
        console.log(this.state);
    }

    getProfile() {
         axios.get('/api/profile')
        .then(res => {console.log(res.data); return this.setState({userProfile: res.data, email: res.data.email})})
        .then(() => this.fetchStories(this.state.userProfile._id));
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
        .then(() => this.getProfile())
        .catch(error => console.log(error));
    }

    logoutUser() {
        console.log('logout');
        axios.post('/api/logout')
        .then(res => console.log(res))
        .then(() => this.props.history.push('/login'))
        .catch(error => console.log(error));
    }

    fetchStories(userId) {
        console.log(userId);
        axios.get('/api/story?userId=' + userId)
        .then(res => this.setState({stories: res.data}));
    }

    getStories() {
        var content = this.state.stories.map(story => {
            return <Story key={story._id} title={story.title} description={story.description} loc={story.loc} imageUrl={story.imageUrl} createdDate={story.createdDate} id={story._id} userId={story.userId}/>
        });
        this.setState({content});
    }

    render() {
        return (
            <div>
                Email: {this.state.userProfile.email}
                <br />
                <TextField floatingLabelText="email" type="text" name="email" value={this.state.email} onChange={this.onChange} />
                <div className="buttons">
                    <RaisedButton type="button" containerElement={<Link to="/story" />}>Home</RaisedButton>
                    <RaisedButton type="button" onClick={this.editProfile}>Edit profile</RaisedButton>
                    <RaisedButton type="button" onClick={this.getStories}>My stories</RaisedButton>
                    <RaisedButton type="button" onClick={this.logoutUser}>Logout</RaisedButton>
                </div>
                <div className="App">
                    {this.state.content}
                </div>
            </div>
        )
    }
}

export default Profile