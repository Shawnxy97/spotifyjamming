import React from "react";
import './Track.css';

export class Track extends React.Component {
    constructor(props){
        super(props);
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
        //need to be bound because we use it in a function call way. and the method uses this, we need to bind the correct this
    }

    addTrack(){
        this.props.onAdd(this.props.track, this.props.selectedPlaylistID);
    }
    
    removeTrack(){
        this.props.onRemove(this.props.track, this.props.selectedPlaylistID);
    }

    renderAction(){
        let isRemoval = this.props.isRemoval;
        let newList = this.props.newListFlag;
        if(newList){
            if(isRemoval){
                return <button className="Track-action" onClick={this.removeTrack}>-</button>;
            }else{
                return <button className="Track-action" onClick={this.addTrack}>+</button>;
            }
        }else{
            //UserPlaylist Removal
            if(isRemoval){
                return <button className="Track-action" onClick={this.removeTrack}>-</button>;
            }else{
                return <button className="Track-action" onClick={this.addTrack}>+</button>;
            }
        }
        
    }
    render(){
        let {name, artist, album} = this.props.track;
        // console.log(name)
        return (
            <div className="Track">
                <div className="Info">
                    <h3 className="trackName">{name}</h3>
                    <p className="artists">{artist} | {album}</p>
                </div>
                {this.renderAction()}
            </div>
        );
    }
}