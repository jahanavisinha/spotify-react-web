import axios from "axios";

export const spotifyApi = axios.create({
    baseURL: "https://api.spotify.com/v1",
});

export const setSpotifyAuthToken = (token: string) => {
    spotifyApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const getUserTopArtists = async () => {
    const response = await spotifyApi.get("/me/top/artists");
    return response.data.items;
};

export const getUserTopTracks = async () => {
    const response = await spotifyApi.get("/me/top/tracks");
    return response.data.items;
};