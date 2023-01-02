import {clientID, redirectURI} from './personalInfo';
let userToken;


export const Spotify = {
    getAccessToken(){
        if(userToken){
            return userToken;
        }else{
            const url = window.location.href;
            let re = /access_token=([^&]*)/;
            let re2 = /expires_in=([^&]*)/;
            const token = url.match(re);
            const expireIn = url.match(re2);

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
    }
};