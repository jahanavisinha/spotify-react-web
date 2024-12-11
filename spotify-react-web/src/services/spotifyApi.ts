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

// Fetch user's profile information
export const getUserProfile = async () => {
    const response = await spotifyApi.get("/me");
    return {
        display_name: response.data.display_name,
        followers: response.data.followers,
        images: response.data.images,
    };
};

// Fetch user's playlists
export const getUserPlaylists = async () => {
    const response = await spotifyApi.get("/me/playlists");
    return response.data.items.map((playlist) => ({
        id: playlist.id,
        name: playlist.name,
        images: playlist.images,
        tracks: { total: playlist.tracks.total }, // Total number of tracks
    }));
};

export const fetchUserData = async () => {
    try {
        const [topArtists, topTracks] = await Promise.all([
            getUserTopArtists(),
            getUserTopTracks(),
        ]);

        return {
            topArtists: topArtists || [],
            recentTracks: topTracks || [], // Default to empty array if undefined
        };
    } catch (error) {
        console.error("Error fetching user data:", error.response || error.message);
        return { topArtists: [], recentTracks: [] };
    }
};


export const fetchTrendingArtists = async () => {
    try {
        const response = await spotifyApi.get("/browse/categories/pop/playlists", {
            params: { country: "US" },
        });

        const playlists = response.data.playlists.items;

        if (playlists.length > 0) {
            const playlistId = playlists[0].id;
            const playlistTracks = await spotifyApi.get(`/playlists/${playlistId}/tracks`);
            const artists = playlistTracks.data.items
                .map((item) => item.track.artists[0]) // Extract first artist
                .filter(Boolean); // Ensure no undefined values

            return [...new Set(artists.map((artist) => ({ id: artist.id, name: artist.name })))];
        }
        return [];
    } catch (error) {
        console.error("Error fetching trending artists:", error.response || error.message);
        return [];
    }
};


export const fetchPopularPlaylists = async () => {
    try {
        const response = await spotifyApi.get("/browse/featured-playlists", {
            params: { country: "US" },
        });

        return response.data.playlists.items.map((playlist) => ({
            id: playlist.id,
            name: playlist.name,
            images: playlist.images, // Include playlist images
        }));
    } catch (error) {
        console.error("Error fetching popular playlists:", error.response || error.message);
        return [];
    }
};


// Fetch user's top artists with error handling
export const getUserTopArtists = async (): Promise<Artist[]> => {
    try {
        const response = await axios.get("https://api.spotify.com/v1/me/top/artists", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("spotifyToken")}`,
            },
        });
        return response.data.items.map((artist: any) => ({
            id: artist.id,
            name: artist.name,
        }));
    } catch (error) {
        console.error("Error fetching top artists:", error.response || error.message);
        throw new Error("Failed to fetch top artists");
    }
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
