import React from 'react';
import './TrackList.css';
import { Track } from '../Track/Track';

export class TrackList extends React.Component{
    render(){
        return (
            <div className='TrackList'>
                {this.props.tracks.map(track => <Track key={track.id} track={track} isRemoval={this.props.isRemoval} onAdd={this.props.onAdd} onRemove={this.props.onRemove} newListFlag={this.props.newListFlag} selectedPlaylistID={this.props.selectedPlaylistID} />)}
               
            </div>
        );
    }
}