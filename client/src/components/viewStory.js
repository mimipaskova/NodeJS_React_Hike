import React, { Component } from 'react';
import axios from 'axios';
import Story from './story';
import { Link } from 'react-router-dom';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

class ViewStory extends Component {

    constructor(props) {
        super(props);

        this.state = {
            story: [],
            content: ''
        };

        this.fetchStory = this.fetchStory.bind(this);
    }

    componentDidMount() {
        this.fetchStory(this.props.match.params.id);
    }

    fetchStory(storyId) {
        axios.get('/api/story/' + storyId)
        .then(res => this.setState({story: res.data}))
        .then(() => this.getStory());
    }

    getStory() {
        var content = <Story title={this.state.story.title} description={this.state.story.description}  loc={this.state.story.loc} imageUrl={this.state.story.imageUrl} createdDate={this.state.story.createdDate} id={this.state.story._id}/>;
        this.setState({content});
    }

    render() {
        console.log(this.state.story, 'fewfewfewfef', this.props.match);
        return (
        <div className="App">
            <Menu className="menu">
                <MenuItem primaryText="Home" containerElement={<Link to="/story" />} />
                <MenuItem primaryText="Profile" containerElement={<Link to="/profile" />} />
            </Menu>
            {this.state.content}       
        </div>
        );
    }
}

export default ViewStory;
