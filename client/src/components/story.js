import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;
const divStyle = {
  width: '500px',
  height: '500px',
};

class Story extends Component {
    static defaultProps = {
        center: {lat: 43, lng: 25},
        zoom: 7
    };

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
                        {this.props.loc[0]}
                    </p>
                    <p>
                        {this.props.loc[1]}
                    </p>
                </div>
            </div>
            <div className="story-mapppp" style={divStyle}>
                <GoogleMapReact
                    bootstrapURLKeys={{key: 'AIzaSyCrhRamoch0_4Coysfx8G0ULPWe0nmDwe0'}}
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}
                >
                    <AnyReactComponent
                    lat={this.props.loc[0]}
                    lng={this.props.loc[0]}
                    text={this.props.title}
                    />
                </GoogleMapReact>
            </div>

            <div className="story-below">
                <div>Споделена от: Иван Иванов</div>
                <div>Дата:{this.props.createdDate}</div>
                { this.props.id ? <Link to={{ pathname: '/storyy/' + this.props.id }}>See the story</Link> : ''}
                <br />
                    <Link to={{ pathname: '/edit/' + this.props.id}}>Edit the story</Link>
            </div>
        </div>
        );
    }
}

export default Story;