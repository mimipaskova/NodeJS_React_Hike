import React, { Component } from 'react';
import axios from 'axios';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

class AddStory extends Component {

    constructor(props) {
        super(props);

        this.state = {
           title: '',
           description: '',
           imageUrl: '',
           lat: '',
           lng: ''
        };

        this.onChange    = this.onChange.bind(this);
        this.addStory = this.addStory.bind(this);
    }

    onChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    addStory() {
        console.log(this.state);
        var story = {
            title: this.state.title,
            description: this.state.description,
            imageUrl: this.state.imageUrl,
            loc: [this.state.lat, this.state.lng]
            // userId: ObjectId("58ff2d1c8f9beb3d8cab4bd2")
        }
        console.log(story);
        axios.post('/api/story', story)
        .then(res => console.log(res))
        .catch(error => console.log(error));
    }


    render() {
        return (
            <div>
                <TextField type="text" id="text-field-title"  floatingLabelText="title" name="title" value={this.state.title} onChange={this.onChange} />
                <br />
                <TextField type="text" id="text-field-description" floatingLabelText="description" name="description" value={this.state.description} onChange={this.onChange}/>
                <br />
                <TextField type="text" id="text-field-image" floatingLabelText="image url" name="imageUrl" value={this.state.imageUrl} onChange={this.onChange}/>
                <br />
                <TextField type="text" id="text-field-lat" floatingLabelText="coordinates.lat" name="lat" value={this.state.lat} onChange={this.onChange}/>
                <br />
                <TextField type="text" id="text-field-lng" floatingLabelText="coordinates.lng" name="lng" value={this.state.lng} onChange={this.onChange}/>
                <br />
                <RaisedButton type="button" onClick={this.addStory}>Add story</RaisedButton>
            </div>
        )
    }
}

export default AddStory