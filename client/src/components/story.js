import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import GoogleMapReact from 'google-map-react';

const Pin = ({ text }) => <div className='pin-map' >{text}</div>;

class Story extends Component {

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
                <div>Shared from: Ivan {this.props.userId}</div>
                <div>Дата:{this.props.createdDate}</div>
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