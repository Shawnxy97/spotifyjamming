import React from 'react';
import './UserPlaylist.css';
import { Track } from '../Track/Track';

export class UserPlaylist extends React.Component {
    render(){
        
        return (

        //    <div className='UserPlaylist'>
        //        {this.props.playlists.map( playlist => {
        //            return <div>{playlist.playlistName}</div>
        //        })}
        //    </div>

        <div className='Playlists'>
            {this.props.playlists.map( playlist => {
                return (<div className='UserPlaylist'>
                            <h2>{playlist.playlistName}</h2>
                            {/* <ul>
                            {playlist.tracks.map(track => <li>{track.name}</li>)}
                            </ul> */}
                            {playlist.tracks.map( track => <Track track={track} /> )}
                        </div>);
            })}
        </div>
        );
    }
}