import React from 'react';
import './UserDropdown.css';

export class UserDropdown extends React.Component {
  
    render(){
        let isDisplay;
        if(this.props.isShow){
            isDisplay = {display: "inline-block"};
        }else{
            isDisplay = {display: "none"};
        }
        return (
            <div id="UserDropdown" style={isDisplay} onMouseEnter={this.props.onMouseIn} onMouseLeave={this.props.onMouseLeave}>
                <ul>
                    <li onClick={this.props.onClick}>My Playlists</li>
                    <li>Logout</li>
                </ul>
            </div>
        );
    }
}