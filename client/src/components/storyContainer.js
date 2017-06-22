import React, { Component } from 'react';
import axios from 'axios';
import Story from './story';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

class StoryContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            stories: [],
            content: '',
            filterValue: ''
        };

        this.getStories = this.getStories.bind(this);
        this.fetchStories = this.fetchStories.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.fetchStories();
    }

    fetchStories() {
        axios.get('/api/story')
        .then(res => this.setState({stories: res.data}));
    }

    getStories() {
        var content = this.state.stories
            .filter(story => {
                return story.title.toLowerCase().includes(this.state.filterValue)})
            .map(story => {
                return <Story key={story._id} title={story.title} description={story.description} createdDate={story.createdDate} id={story._id} userId={story.userId}/>
            });
        this.setState({content});
    }

    handleChange(event) {
        this.setState({filterValue: event.target.value}, () => this.getStories());
    }

    render() {
        return (
        <div className="App">
            <label>Filter by name</label>
            <TextField value={this.state.filterValue} onChange={this.handleChange}/>
            <br/>
            <RaisedButton type="button" onClick={this.getStories}>Get all stories</RaisedButton>
            <br />
             <Link to="/add">Add story</Link>
            <div>
                {this.state.content}
            </div>
            
        </div>
        );
    }
}

export default StoryContainer;
