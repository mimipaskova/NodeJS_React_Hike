import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Story extends Component {

    render() {
        console.log(this.props);
        return (
        <div className="story-container">
            <img className="story-thumbnail img-thumbnail" src={'https://pbs.twimg.com/media/CdlFCYmXIAAGkiH.jpg'} alt="pandaaa" />
            
            <div className="story-information">
                <div className="story-title">
                    {this.props.title}
                </div>

                <div className="story-description">
                    <p>
                        {this.props.description}
                    </p>
                </div>
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