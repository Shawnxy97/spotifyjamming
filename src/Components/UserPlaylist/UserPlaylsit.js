import React from 'react';
import './UserPlaylist.css';
import { Track } from '../Track/Track';
import { TrackList } from '../TrackList/TrackList';

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
                            {playlist.tracks.map( track => <Track track={track} /> )}
                        </div>);
                // return (
                //     <div className='UserPlaylist'>
                //         <h2>{playlist.playlistName}</h2>
                //         {playlist.tracks.map( track => <TrackList  tracks={track} isRemoval={true} />)}
                //     </div>
                // );
            })}
        </div>
        );
    }
}