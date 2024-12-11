import axios from "axios";

// Create an Axios instance for Spotify API
export const spotifyApi = axios.create({
    baseURL: "https://api.spotify.com/v1",
});

// Set Authorization Header for Spotify API
export const setSpotifyAuthToken = (token: string) => {
    spotifyApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

// Token validation helper
export const isTokenValid = (): boolean => {
    const token = localStorage.getItem("spotifyToken");
    const expiryTime = parseInt(localStorage.getItem("spotifyTokenExpiry") || "0", 10);
    return token !== null && Date.now() < expiryTime;
};

// Handle Spotify API errors
export const handleSpotifyError = (error: any) => {
    console.error("Spotify API Error:", error.response?.data || error.message || error);
};

// Fetch user's profile information
export const getUserProfile = async () => {
    try {
        if (!isTokenValid()) {
            throw new Error("Invalid or expired token");
        }

        const response = await spotifyApi.get("/me");
        return {
            display_name: response.data.display_name,
            followers: response.data.followers,
            images: response.data.images,
        };
    } catch (error) {
        handleSpotifyError(error);
        throw new Error("Failed to fetch user profile");
    }
};

// Fetch user's playlists
export const getUserPlaylists = async () => {
    try {
        if (!isTokenValid()) {
            throw new Error("Invalid or expired token");
        }

        const response = await spotifyApi.get("/me/playlists");
        return response.data.items.map((playlist: any) => ({
            id: playlist.id,
            name: playlist.name,
            images: playlist.images,
            tracks: { total: playlist.tracks.total }, // Total number of tracks
        }));
    } catch (error) {
        handleSpotifyError(error);
        throw new Error("Failed to fetch user playlists");
    }
};

// Fetch user's top artists
export const getUserTopArtists = async (): Promise<Artist[]> => {
    try {
        if (!isTokenValid()) {
            throw new Error("Invalid or expired token");
        }

        const response = await spotifyApi.get("/me/top/artists");
        return response.data.items.map((artist: any) => ({
            id: artist.id,
            name: artist.name,
            followers: artist.followers?.total,
            images: artist.images,
        }));
    } catch (error) {
        handleSpotifyError(error);
        throw new Error("Failed to fetch top artists");
    }
};

// Fetch user's top tracks
export const getUserTopTracks = async () => {
    try {
        if (!isTokenValid()) {
            throw new Error("Invalid or expired token");
        }

        const response = await spotifyApi.get("/me/top/tracks");
        return response.data.items.map((track: any) => ({
            id: track.id,
            name: track.name,
            artist: track.artists[0]?.name, // Assuming the first artist
        }));
    } catch (error) {
        handleSpotifyError(error);
        throw new Error("Failed to fetch top tracks");
    }
};

// Fetch user-specific data (top artists and tracks)
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
        handleSpotifyError(error);
        return { topArtists: [], recentTracks: [] };
    }
};

// Fetch trending artists (based on popular playlists)
export const fetchTrendingArtists = async () => {
    try {
        if (!isTokenValid()) {
            throw new Error("Invalid or expired token");
        }

        const response = await spotifyApi.get("/browse/categories/pop/playlists", {
            params: { country: "US" },
        });

        const playlists = response.data.playlists.items;

        if (playlists.length > 0) {
            const playlistId = playlists[0].id;
            const playlistTracks = await spotifyApi.get(`/playlists/${playlistId}/tracks`);
            const artists = playlistTracks.data.items
                .map((item: any) => item.track.artists[0]) // Extract first artist
                .filter(Boolean); // Ensure no undefined values

            return [...new Set(artists.map((artist: any) => ({ id: artist.id, name: artist.name })))];
        }
        return [];
    } catch (error) {
        handleSpotifyError(error);
        return [];
    }
};

// Fetch popular playlists
export const fetchPopularPlaylists = async () => {
    try {
        if (!isTokenValid()) {
            throw new Error("Invalid or expired token");
        }

        const response = await spotifyApi.get("/browse/featured-playlists", {
            params: { country: "US" },
        });

        return response.data.playlists.items.map((playlist: any) => ({
            id: playlist.id,
            name: playlist.name,
            images: playlist.images, // Include playlist images
        }));
    } catch (error) {
        handleSpotifyError(error);
        return [];
    }
};

// Fetch search results for a query
export const fetchSearchResults = async (query: string) => {
    try {
        if (!isTokenValid()) {
            throw new Error("Invalid or expired token");
        }

        const response = await spotifyApi.get("/search", {
            params: {
                q: query,
                type: "artist,track,album,playlist",
                limit: 10,
            },
        });

        return response.data;
    } catch (error) {
        handleSpotifyError(error);
        throw new Error("Failed to fetch search results");
    }
};

// Define Artist interface
interface Artist {
    id: string;
    name: string;
    followers?: number;
    images?: { url: string }[];
}
