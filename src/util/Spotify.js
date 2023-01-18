import { findRenderedComponentWithType } from 'react-dom/test-utils';
import {clientID, redirectURI} from './personalInfo';
let userToken;
let baseAddress = "https://api.spotify.com";


export const Spotify = {
    getAccessToken(){
        if(userToken){
            return userToken;
        }else{
            const url = window.location.href;
            let reOftoken = /access_token=([^&]*)/;
            let reOfExpireTime = /expires_in=([^&]*)/;
            const token = url.match(reOftoken);
            const expireIn = url.match(reOfExpireTime);

            if(token && expireIn){
                userToken = token[1];
                window.setTimeout(()=> {userToken = null}, Number(expireIn[1])*1000);
                window.history.pushState("Access Token", null, "/");

                return userToken;
            }else{
                const authURL = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
                window.location = authURL;
            }
        }
    },
    search(term){
        const accessToken = Spotify.getAccessToken();
        const url = `https://api.spotify.com/v1/search?type=track&q=${term}`;
        return fetch(url, { headers: {Authorization: `Bearer ${accessToken}`}})
        .then( response => {
            return response.json();
        })
        .then(jsonResponse => {
            if(jsonResponse.tracks){
                return jsonResponse.tracks.items.map(track => {return {id:track.id, name:track.name, artist: track.artists[0].name, album:track.album.name, uri: track.uri}});

            }else{
                return [];
            }
        })
    },

    savePlaylist(playlistName, trackURIs){
        if(!playlistName || !trackURIs.length){
            return;
        }
        let accessToken = Spotify.getAccessToken();
        let headers = {Authorization: `Bearer ${accessToken}`};
        let userID;

        return fetch("https://api.spotify.com/v1/me", {headers: headers})
        .then( response => {
            // console.log(response);
            return response.json();
        })
        .then( jsonResponse => {
            
            userID = jsonResponse.id;
            //Create a new playlist
            return fetch(baseAddress+`/v1/users/${userID}/playlists`, {
                headers:headers,
                method: "POST",
                body: JSON.stringify({name: playlistName})
            })
        })
        .then( response => {
            return response.json();
        })
        .then( jsonResponse => {
            let playlistID = jsonResponse.id;
            //Get the playlistID and push tracks into the new playlist
            return fetch(baseAddress+`/v1/playlists/${playlistID}/tracks`, {
                headers: headers,
                method: "POST",
                body: JSON.stringify({"uris": trackURIs})
            })
        })

    },

    getUserProfile(){
        let accessToken = Spotify.getAccessToken();
        let headers = {Authorization: `Bearer ${accessToken}`};

        return fetch(baseAddress+"/v1/me", {headers: headers})
        .then( response => {
            return response.json();
        })
        .then( jsonResponse => {
            return [jsonResponse.display_name, jsonResponse.images];
        })
    },

    getUserPlaylists(){
        let accessToken = Spotify.getAccessToken();
        let headers = {Authorization: `Bearer ${accessToken}`};

        return fetch(baseAddress+"/v1/me/playlists", {headers: headers})
        .then( response => {
            // console.log(response)
            return response.json();
        })
        .then( jsonResponse => {
            // console.log(jsonResponse)
            let playlists = jsonResponse.items.map(playlist=> ({playlistID: playlist.id, playlistName: playlist.name, tracksHref: playlist.tracks.href}));
            
            let userPlaylists = [];
            for(let playlist of playlists){
                Spotify.getTracksinUserPlaylist(playlist.tracksHref)
                .then( result => {
                userPlaylists.push({playlistID: playlist.playlistID, playlistName: playlist.playlistName, tracks: result})
                })
            }
            console.log(userPlaylists, "---------- UserPlaylists Log");
            return userPlaylists;
            // let fetchList = playlists.map(track => fetch(track.href, {headers: headers}));
            // let fetchPromises = Promise.all(fetchList);
            // return fetchPromises;
        })

       
        
    },

    getTracksinUserPlaylist(trackHref){
        let accessToken = Spotify.getAccessToken();
        let headers = {Authorization: `Bearer ${accessToken}`};
        // console.log(trackHref)

        return fetch(trackHref, {headers: headers})
        .then( response => {
            return response.json();
        })
        .then( jsonResponse => {
            // console.log(jsonResponse);
            let tracks = [];
            jsonResponse.items.map( item => {
                if(item.track){
                    tracks.push({id:item.track.id, name:item.track.name, artist: item.track.artists[0].name, album: item.track.album.name, uri: item.track.uri});
                }
            });
            return tracks;
           
        })
    },

    updateUserPlaylist(playlistID, tracksURIs){
        let accessToken = Spotify.getAccessToken();
        let headers = { Authorization: `Bearer ${accessToken}`};

        console.log(playlistID, "-------Spotify API");
        console.log(tracksURIs);

        return fetch(baseAddress+`/v1/playlists/${playlistID}/tracks`, {
            headers:headers,
            method: "PUT",
            body: JSON.stringify({uris: tracksURIs})
        })
    }
};