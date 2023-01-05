import React from 'react';
import './UserProfile.css';
// import guestImage from './guestImage.jpg';

export class UserProfile extends React.Component {
    render(){
        return (
            <div className='UserProfile' onMouseEnter={this.props.onMouseEnter}>
                <img className="image" src={this.props.image} />
                <h3 className='username'>{this.props.username}</h3>
            </div>
        );
    }
}