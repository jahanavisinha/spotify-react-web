// import axios from "axios";
//
// export const spotifyApi = axios.create({
//     baseURL: "https://api.spotify.com/v1",
// });
//
// export const setSpotifyAuthToken = (token: string) => {
//     spotifyApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;
// };
//
// export const getUserTopArtists = async () => {
//     const response = await spotifyApi.get("/me/top/artists");
//     return response.data.items;
// };
//
// export const getUserTopTracks = async () => {
//     const response = await spotifyApi.get("/me/top/tracks");
//     return response.data.items;
// };

import axios from "axios";

export const spotifyApi = axios.create({
    baseURL: "https://api.spotify.com/v1",
});

export const setSpotifyAuthToken = (token: string) => {
    spotifyApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

// Fetch user-specific data
export const fetchUserData = async () => {
    const [topArtists, topTracks] = await Promise.all([
        getUserTopArtists(),
        getUserTopTracks(),
    ]);

    return {
        topArtists,
        recentTracks: topTracks, // Assuming top tracks as recent for simplicity
    };
};

// Fetch trending artists
export const fetchTrendingArtists = async () => {
    const response = await spotifyApi.get("/browse/categories/pop/playlists", {
        params: { country: "US" },
    });

    const playlists = response.data.playlists.items;

    // Fetch artists from the first playlist as a proxy for "trending artists"
    if (playlists.length > 0) {
        const playlistId = playlists[0].id;
        const playlistTracks = await spotifyApi.get(`/playlists/11dFghVXANMlKmJXsNCbNl/tracks`);
        const artists = playlistTracks.data.items.map(
            (item) => item.track.artists[0] // Assuming the first artist
        );

        return [...new Set(artists.map((artist) => ({ id: artist.id, name: artist.name })))];
    }

    return [];
};

// Fetch popular playlists
export const fetchPopularPlaylists = async () => {
    const response = await spotifyApi.get("/browse/featured-playlists", {
        params: { country: "US" },
    });

    return response.data.playlists.items.map((playlist) => ({
        id: playlist.id,
        name: playlist.name,
    }));
};

// Fetch user's top artists
export const getUserTopArtists = async () => {
    const response = await spotifyApi.get("/me/top/artists");
    return response.data.items.map((artist) => ({
        id: artist.id,
        name: artist.name,
    }));
};

// Fetch user's top tracks
export const getUserTopTracks = async () => {
    const response = await spotifyApi.get("/me/top/tracks");
    return response.data.items.map((track) => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0]?.name, // Assuming the first artist
    }));
};
