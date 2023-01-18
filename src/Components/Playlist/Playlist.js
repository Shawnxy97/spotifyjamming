import React from 'react';
import './Playlist.css';
import { TrackList } from '../TrackList/TrackList';

export class Playlist extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            selector: "new",
            selectedTrackContent: [],
            selectedPlaylistID: "",
            selectedPlaylistName: "",
            listsVisibility: true
        };

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleClickedButton = this.handleClickedButton.bind(this);
        this.handlePlaylistsClick = this.handlePlaylistsClick.bind(this);
    }

    handleNameChange(e){
        let newName = e.target.value;
        this.props.onNameChange(newName);
    }

    handleClickedButton(e){
        this.newList.style.backgroundColor = "#010c3f";
        this.userList.style.backgroundColor = "#010c3f";
        
        e.target.style.backgroundColor = "#6c41ec";
        this.setState({selector: e.target.value, listsVisibility: true});
        console.log(e.target.value);
        

        const selectorFlag = e.target.value === "new";
        this.props.handleNewListFlag(selectorFlag);
    }

    componentDidMount(){
        this.newList = document.getElementById('newlist');
        this.userList = document.getElementById('userlist');
    }

    handlePlaylistsClick(e){
        const playlistname = e.target.getAttribute('name');
        const playlistID = e.target.getAttribute('value');
        console.log(playlistID)

        let tracks = [];

        const selected = this.props.userPlaylists.filter( item => 
            item.playlistName === playlistname );
        
        tracks = selected[0]['tracks'];

        console.log(tracks)

        this.props.getSelectedPlaylistID(playlistID);


        this.setState({selectedPlaylistID: playlistID,selectedTrackContent: tracks, listsVisibility: false, selectedPlaylistName: selected[0]['playlistName']})
        
    }



    render(){
        const selectorFlag = this.state.selector === "new";
        let renderedJSX = <div></div>;

        if(selectorFlag){
            renderedJSX = (
                <>
                    <input type="text" defaultValue={this.props.playlistName} onChange={this.handleNameChange} /> 
                    <TrackList tracks={this.props.playlistTracks} isRemoval={true} onRemove={this.props.onRemove} />
                    <button className='Playlist-save' onClick={this.props.onSave}>SAVE TO SPOTIFY</button>
                </>
            );
        }else{
            renderedJSX = (
                <>
                    { this.state.listsVisibility ? <h2>My Playlists</h2> : <h2>{this.state.selectedPlaylistName}</h2>}
                    {this.state.listsVisibility && (<ul id='myPlaylist'>
                        {this.props.userPlaylists.map(userplaylist => { return <li onClick={this.handlePlaylistsClick} key={userplaylist.playlistID} value={userplaylist.playlistID} name={userplaylist.playlistName}>{userplaylist.playlistName}</li>})}
                    </ul>)}
                    
                    { this.state.selectedTrackContent && !this.state.listsVisibility && <TrackList tracks={this.state.selectedTrackContent} isRemoval={true} onRemove={this.props.onRemove} newListFlag={selectorFlag} selectedPlaylistID={this.state.selectedPlaylistID} /> }

                    {!this.state.listsVisibility && <button className='Playlist-save' onClick={this.props.userlistSave}>SAVE TO SPOTIFY</button> }
                </>
            );
        }
        return (
            <div className='PContainer'>
                
                {/* <div className='Playlist'>
                    {selectorFlag ? <input type="text" defaultValue={this.props.playlistName} onChange={this.handleNameChange} /> : <h2>My Playlists</h2>}
                    {selectorFlag ? <TrackList tracks={this.props.playlistTracks} isRemoval={true} onRemove={this.props.onRemove} /> : this.props.userPlaylists.map(userplaylist => { return <p>{userplaylist.playlistName}</p>})}
                    {selectorFlag && <button className='Playlist-save' onClick={this.props.onSave}>SAVE TO SPOTIFY</button>}
                </div> */}
                <div className='Playlist'>
                {renderedJSX}
                {/* {this.selectedPlaylist} */}
                </div>
                

                <div className='SwitchBar'>
                    <button id="newlist"value="new" onClick={this.handleClickedButton}>New</button>
                    <button id='userlist' value="mine" onClick={this.handleClickedButton}>Mine</button>
                </div>

            </div>
        );
    }
}