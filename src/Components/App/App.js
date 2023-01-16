import React from 'react';
import './App.css';
import { SearchBar } from '../SearchBar/SearchBar';
import { Playlist } from '../Playlist/Playlist';
import { SearchResults } from '../SearchResults/SearchResults';
import { Spotify  } from '../../util/Spotify';
import { UserProfile } from '../UserProfile/UserProfile';
import { UserDropdown } from '../UserDropdown/UserDropdown';
import { UserPlaylist } from '../UserPlaylist/UserPlaylsit';
import defaultImage from "../UserProfile/guestImage.jpg";

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
                  playlistName: "New Playlist",
                  playlistTracks: [],
                  userName: "anonymous",
                  userImage: defaultImage,
                  userDropdown: false,
                  userPlaylists: [],
                  isDisplayUserPlaylists: false,
                  userProfileHovered: false,
                  dropdownHovered: false
                  

    };

    //bind this, since this addTrack method will be passed to use as an Event handler, make sure this inside the method refers to App instance
    this.addTrack = this.addTrack.bind(this);  
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    this.handleUserProfileHover = this.handleUserProfileHover.bind(this);
    this.handleUserDropdownOut = this.handleUserDropdownOut.bind(this);
    this.handlePlaylistClick = this.handlePlaylistClick.bind(this);
    this.handleUserDropdownIn = this.handleUserDropdownIn.bind(this);
    this.handleUserProfileOut = this.handleUserProfileOut.bind(this);

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


    //After saving a new playlist, fetch the playlists again
    
    Spotify.getUserPlaylists()
    .then( results => {
      // this.setState({userPlaylists: results});
      // console.log(this.state.userPlaylists);

      this.setState({userPlaylists: results});
      // console.log(results)
      
    })

  }

  search(term){
    Spotify.search(term).then(results => {
      this.setState({searchResults: results});
    })
  }

  componentDidMount(){
    Spotify.getUserProfile().then(results => {
      if(results[1]){
        // console.log(results)
        this.setState({userName:results[0], userImage: results[1][0]["url"]});
      }else{
        this.setState({userName: results[0]});
      }
      
    });

    Spotify.getUserPlaylists()
    .then( results => {
      // this.setState({userPlaylists: results});
      // console.log(this.state.userPlaylists);

      this.setState({userPlaylists: results});
      // console.log(results)
      
    })

    
  }

 

  handleUserProfileHover(){
    this.setState({userProfileHovered: true});
    this.setState({userDropdown:true});

    
  }

  handleUserProfileOut(){
    this.setState({userProfileHovered: false});

    //Set a timer: after 0.5 seconds, the dropdown list will disappear
    this.dropdownTimerID = setTimeout(()=> {
      this.setState({userDropdown: false});
    }, 500)
  }

  handleUserDropdownIn(){
    //If a user hovers over the Dropdown Component in  0.5 seconds, cancel the timer
    clearTimeout(this.dropdownTimerID);
    console.log("--------------The timer for dropdown list is cancelled.");
  }

  handleUserDropdownOut(){
    this.setState({userDropdown:false});
    // console.log(this.state.userDropdown, "displayflag");
  }

  handlePlaylistClick(){
    this.setState({isDisplayUserPlaylists: !this.state.isDisplayUserPlaylists});

    
  }

  // handleSelectBarChange(barName){
  //   if(barName === 'new'){

  //   }else if(barName === 'mine'){

  //   }
  // }


  render(){
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing </h1>
        <UserProfile username={this.state.userName} image={this.state.userImage} onMouseEnter={this.handleUserProfileHover} onMouseOut={this.handleUserProfileOut} />
        <UserDropdown isShow={this.state.userDropdown}  onMouseIn={this.handleUserDropdownIn} onMouseLeave={this.handleUserDropdownOut} onClick={this.handlePlaylistClick}/>
        
        <div className="App">
          { !this.state.isDisplayUserPlaylists && <SearchBar onSearch={this.search} />}
          <div className="App-playlist">
            { !this.state.isDisplayUserPlaylists && <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />}
            { !this.state.isDisplayUserPlaylists && <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} userPlaylists={this.state.userPlaylists} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist} />}
            { this.state.isDisplayUserPlaylists && <UserPlaylist playlists={this.state.userPlaylists} />}
            
          </div>
        </div>
      </div>
    );
  }
}

export default App;
