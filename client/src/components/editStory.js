import React, { Component } from 'react';
import axios from 'axios';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

class EditStory extends Component {

    constructor(props) {
        super(props);

        this.state = {
           story: [],
           title: '',
           description: '',
           imageUrl: '',
           lat: '',
           lng: ''
        };

        this.onChange    = this.onChange.bind(this);
        this.editStory = this.editStory.bind(this);
        this.fetchStory = this.fetchStory.bind(this);
    }
    componentDidMount() {
        this.fetchStory(this.props.match.params.id);
    }

    onChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    fetchStory(storyId) {
        axios.get('/api/story/' + storyId)
        .then(res => this.setState({story: res.data}))
        .then(() => this.setState({
            title: this.state.story.title,
            description: this.state.story.description, 
            imageUrl: this.state.story.imageUrl, 
            lat: this.state.story.loc[0],
            lng: this.state.story.loc[1]
        }))
        .then((res) => console.log(res));
    }

    editStory() {
        var story = {
            title: this.state.title,
            description: this.state.description,
            imageUrl: this.state.imageUrl,
            loc: [this.state.lat, this.state.lng]
        }
        var storyId = this.state.story._id;
        axios.put('/api/story/' + storyId, story)
        .then(res => console.log(res))
        .catch(error => console.log(error));
    }


    render() {
        return (
            <div>
                <TextField id="text-field-title" type="text" name="title" value={this.state.title} onChange={this.onChange} />
                <br />
                <TextField id="text-field-description" type="text" name="description" value={this.state.description} onChange={this.onChange}/>
                <br />
                <TextField id="text-field-image" type="text" floatingLabelText="image url" name="imageUrl" value={this.state.imageUrl} onChange={this.onChange}/>
                <br />
                <TextField type="text" id="text-field-lat" floatingLabelText="coordinates.lat" name="lat" value={this.state.lat} onChange={this.onChange}/>
                <br />
                <TextField type="text" id="text-field-lng" floatingLabelText="coordinates.lng" name="lng" value={this.state.lng} onChange={this.onChange}/>
                <br />
                <RaisedButton type="button" onClick={this.editStory}>Edit story</RaisedButton>
            </div>
        )
    }
}

export default EditStory