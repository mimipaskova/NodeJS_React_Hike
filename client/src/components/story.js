import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import GoogleMapReact from 'google-map-react';
import axios from 'axios';

const Pin = ({ text }) => <div className='pin-map' >{text}</div>;

class Story extends Component {

// TODO remove logic from here (constructor, componentDidMount and getProfile)
    constructor(props) {
        super(props);

        this.state = {
            userProfile: '',
        };

        this.getProfile = this.getProfile.bind(this);
    }

    componentDidMount() {
       this.getProfile();
    }

    getProfile() {
         axios.get('/api/user/' +  this.props.userId)
        .then(res => {console.log(res.data); return this.setState({userProfile: res.data})});
    }

    render() {
        console.log(this.props);
        return (
        <div className="story-container">
            <img className="story-thumbnail img-thumbnail" src={this.props.imageUrl} alt="pandaaa" />
            
            <div className="story-information">
                <div className="story-title">
                    {this.props.title}
                </div>

                <div className="story-description">
                    <p>
                        {this.props.description}
                    </p>
                    <p>
                        Lattitude: {this.props.loc[0]}
                    </p>
                    <p>
                        Longitude: {this.props.loc[1]}
                    </p>
                </div>
                <div>Created by: {this.state.userProfile.email}</div>
                <div>Date: {this.props.createdDate}</div>
                { this.props.id ? <Link to={{ pathname: '/storyy/' + this.props.id }}>See the story</Link> : ''}
                <br />
                    <Link to={{ pathname: '/edit/' + this.props.id}}>Edit the story</Link>
            </div>
            <div className="story-map">
                <GoogleMapReact
                    bootstrapURLKeys={{key: 'AIzaSyCrhRamoch0_4Coysfx8G0ULPWe0nmDwe0'}}
                    defaultCenter={ { lat: Number(this.props.loc[0]), lng: Number(this.props.loc[1]) } }
                    defaultZoom={7}>
                    <Pin 
                    lat={Number(this.props.loc[0])}
                    lng={Number(this.props.loc[1])}
                    text={this.props.title}
                    />
                </GoogleMapReact>
            </div>
        </div>
        );
    }
}

export default Story;