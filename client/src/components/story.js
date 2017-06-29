import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import GoogleMapReact from 'google-map-react';

const K_WIDTH = 40;
const K_HEIGHT = 40;
const greatPlaceStyle = {
  // initially any map object has left top corner at lat lng coordinates
  // it's on you to set object origin to 0,0 coordinates
  position: 'absolute',
  width: K_WIDTH,
  height: K_HEIGHT,
  left: -K_WIDTH / 2,
  top: -K_HEIGHT / 2,

  border: '5px solid #f44336',
  borderRadius: K_HEIGHT,
  backgroundColor: 'white',
  textAlign: 'center',
  color: '#3f51b5',
  fontSize: 16,
  fontWeight: 'bold',
  padding: 4
};

const Pin = ({ text }) => <div className='pin-map'  style={greatPlaceStyle}>{text}</div>;

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