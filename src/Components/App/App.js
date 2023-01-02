import React from 'react';
import './App.css';
import { SearchBar } from '../SearchBar/SearchBar';
import { Playlist } from '../Playlist/Playlist';
import { SearchResults } from '../SearchResults/SearchResults';
import { Spotify  } from '../../util/Spotify';

const hardcodeResults = [
  {'uri': '001','id': '001', "name": 'Dancing with A Stranger', 'artist': 'Sam Smith', 'album': 'Dancing with A Stranger'},
  {'uri': '002','id': '002', "name": 'Little Talks', 'artist': 'Of Monsters and Men', 'album': 'My Head is An Animal'},
  {'uri': '003','id': '003', "name": 'Southwark', 'artist': 'Yumi Zouma', 'album': 'Truth or Consequences'},
  {'uri': '004','id': '004', "name": 'Turns', 'artist': 'Lionzed', 'album': 'Turns'},
  {'uri': '005','id': '005', "name": 'Stay', 'artist': 'Ghostly Kisses', 'album': 'Never Let Me Go'}
];

const hardcodePlaylist = [
  {'uri': '003','id': '003', "name": 'Southwark', 'artist': 'Yumi Zouma', 'album': 'Truth or Consequences'},
  {'uri': '004','id': '004', "name": 'Turns', 'artist': 'Lionzed', 'album': 'Turns'},
];

class App extends React.Component{
  constructor(props){
    super(props);

    this.state = {searchResults: [],
                  playlistName: "My Playlist",
                  playlistTracks: []
    };

    //bind this, since this addTrack method will be passed to use as an Event handler, make sure this inside the method refers to App instance
    this.addTrack = this.addTrack.bind(this);  
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);

  }

  addTrack(newTrack){
    let playlistTracks = this.state.playlistTracks;
    if(playlistTracks.find(track => track.id === newTrack.id)){
      return;
    }
    playlistTracks.push(newTrack);
    this.setState({playlistTracks: playlistTracks});
  }

  removeTrack(removedTrack){
    let tracks = this.state.playlistTracks;
    let newTrakcs = tracks.filter(track => track.id !== removedTrack.id);
    this.setState({playlistTracks: newTrakcs});
  }

  updatePlaylistName(newName){
    this.setState({playlistName: newName});
  }

  savePlaylist(){
    let trackURIs = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackURIs)
    .then(()=> {
      //We want to make sure the playlist is saved successfully
      this.setState({playlistName: "New Playlist", playlistTracks: []});
    });

  }

  search(term){
    Spotify.search(term).then(results => {
      this.setState({searchResults: results});
    })
  }

  render(){
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
