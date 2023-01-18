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
                    {this.props.displayLists ? <li onClick={this.props.onClick}>Back to Home</li> : <li onClick={this.props.onClick}>View My Playlists</li>}
                    {/* <li>Logout</li> */}
                </ul>
            </div>
        );
    }
}