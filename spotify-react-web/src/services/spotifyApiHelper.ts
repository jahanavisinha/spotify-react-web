// import axios from "axios";
//
// const SPOTIFY_ACCOUNTS_URL = "https://accounts.spotify.com/api/token";
// const SPOTIFY_API_BASE_URL = "https://api.spotify.com/v1";
// const CLIENT_ID = "77693689203b4c61b7c292e35603f65e";
// const CLIENT_SECRET = "5318e4996d0b4e588cbae945996a62ad";
// const REDIRECT_URI = "http://localhost:5173/home";
//
// // Create Axios instance for Spotify API
// export const spotifyApi = axios.create({
//     baseURL: SPOTIFY_API_BASE_URL,
// });
//
// // Helper to set Authorization header
// const setSpotifyAuthToken = async (): Promise<void> => {
//     if (isTokenExpired()) {
//         const newToken = await refreshToken();
//         if (!newToken) {
//             throw new Error("Failed to refresh Spotify token. Please log in again.");
//         }
//     }
//     const token = localStorage.getItem("spotifyToken");
//     if (token) {
//         spotifyApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//     } else {
//         console.error("No valid token available");
//         throw new Error("Spotify token is missing or invalid.");
//     }
// };
//
// // Helper to check if token is expired
// const isTokenExpired = (): boolean => {
//     const expiry = localStorage.getItem("spotifyTokenExpiry");
//     return !expiry || Date.now() > parseInt(expiry, 10);
// };
//
// // Refresh token
// export const refreshToken = async (): Promise<string | null> => {
//     const refreshToken = localStorage.getItem("spotifyRefreshToken");
//
//     if (!refreshToken) {
//         console.error("No refresh token available");
//         throw new Error("Failed to refresh Spotify token. Please log in again.");
//     }
//
//     try {
//         const response = await axios.post(
//             SPOTIFY_ACCOUNTS_URL,
//             new URLSearchParams({
//                 grant_type: "refresh_token",
//                 refresh_token: refreshToken,
//             }).toString(),
//             {
//                 headers: {
//                     Authorization: `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`,
//                     "Content-Type": "application/x-www-form-urlencoded",
//                 },
//             }
//         );
//
//         const { access_token, expires_in } = response.data;
//
//         localStorage.setItem("spotifyToken", access_token);
//         localStorage.setItem(
//             "spotifyTokenExpiry",
//             (Date.now() + expires_in * 1000).toString()
//         );
//
//         console.log("Token refreshed successfully");
//         return access_token;
//     } catch (error) {
//         console.error("Error refreshing Spotify token:", error);
//         throw new Error("Failed to refresh Spotify token. Please log in again.");
//     }
// };
//
//
// // Get token from authorization code
// export const getTokenFromCode = async (code: string): Promise<string | null> => {
//     try {
//         const response = await axios.post(
//             SPOTIFY_ACCOUNTS_URL,
//             new URLSearchParams({
//                 grant_type: "authorization_code",
//                 code,
//                 redirect_uri: REDIRECT_URI,
//             }).toString(),
//             {
//                 headers: {
//                     Authorization: `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`,
//                     "Content-Type": "application/x-www-form-urlencoded",
//                 },
//             }
//         );
//
//         const { access_token, refresh_token, expires_in } = response.data;
//
//         localStorage.setItem("spotifyToken", access_token);
//         localStorage.setItem("spotifyRefreshToken", refresh_token); // Store refresh token
//         localStorage.setItem(
//             "spotifyTokenExpiry",
//             (Date.now() + expires_in * 1000).toString()
//         );
//
//         console.log("Token and refresh token stored successfully");
//         return access_token;
//     } catch (error) {
//         console.error("Error retrieving token:", error);
//         return null;
//     }
// };
//
//
// // Fetch User Profile
// const getUserProfile = async (): Promise<any> => {
//     try {
//         await setSpotifyAuthToken();
//         const response = await spotifyApi.get("/me");
//         return response.data;
//     } catch (error) {
//         console.error("Failed to fetch user profile:", error);
//         throw error;
//     }
// };
//
// // Fetch User's Top Artists
// const getUserTopArtists = async (): Promise<any[]> => {
//     try {
//         await setSpotifyAuthToken();
//         const response = await spotifyApi.get("/me/top/artists");
//         return response.data.items.map((artist: any) => ({
//             id: artist.id,
//             name: artist.name,
//             image: artist.images[0]?.url,
//             followers: artist.followers?.total,
//         }));
//     } catch (error) {
//         console.error("Error fetching top artists:", error);
//         throw error;
//     }
// };
//
// // Fetch User's Playlists
// const getUserPlaylists = async (): Promise<any[]> => {
//     try {
//         await setSpotifyAuthToken();
//         const response = await spotifyApi.get("/me/playlists");
//         return response.data.items.map((playlist: any) => ({
//             id: playlist.id,
//             name: playlist.name,
//             image: playlist.images[0]?.url,
//             tracks: { total: playlist.tracks.total },
//         }));
//     } catch (error) {
//         console.error("Error fetching user playlists:", error);
//         throw error;
//     }
// };
//
// // Fetch Trending Artists
// const fetchTrendingArtists = async (): Promise<any[]> => {
//     try {
//         await setSpotifyAuthToken();
//         const response = await spotifyApi.get("/browse/categories/pop/playlists");
//         const playlists = response.data.playlists.items;
//
//         if (playlists.length > 0) {
//             const playlistId = playlists[0].id;
//             const tracksResponse = await spotifyApi.get(`/playlists/${playlistId}/tracks`);
//             return tracksResponse.data.items
//                 .map((track: any) => track.track.artists[0])
//                 .filter(Boolean)
//                 .map((artist: any) => ({
//                     id: artist.id,
//                     name: artist.name,
//                 }));
//         }
//
//         return [];
//     } catch (error) {
//         console.error("Error fetching trending artists:", error);
//         throw error;
//     }
// };
//
// // Fetch Popular Playlists
// const fetchPopularPlaylists = async (): Promise<any[]> => {
//     try {
//         await setSpotifyAuthToken();
//         const response = await spotifyApi.get("/browse/featured-playlists");
//         return response.data.playlists.items.map((playlist: any) => ({
//             id: playlist.id,
//             name: playlist.name,
//             image: playlist.images[0]?.url,
//         }));
//     } catch (error) {
//         console.error("Error fetching popular playlists:", error);
//         throw error;
//     }
// };
//
// // Fetch Search Results
// const fetchSearchResults = async (query: string): Promise<any[]> => {
//     try {
//         await setSpotifyAuthToken();
//         const response = await spotifyApi.get("/search", {
//             params: {
//                 q: query,
//                 type: "album,artist,playlist,track",
//                 limit: 10,
//             },
//         });
//
//         const { albums, artists, playlists, tracks } = response.data;
//         const results: any[] = [];
//
//         if (albums?.items) {
//             results.push(
//                 ...albums.items.map((album: any) => ({
//                     id: album.id,
//                     name: album.name,
//                     type: "album",
//                     image: album.images[0]?.url,
//                     artist: album.artists[0]?.name,
//                 }))
//             );
//         }
//
//         if (artists?.items) {
//             results.push(
//                 ...artists.items.map((artist: any) => ({
//                     id: artist.id,
//                     name: artist.name,
//                     type: "artist",
//                     image: artist.images[0]?.url,
//                     followers: artist.followers?.total,
//                 }))
//             );
//         }
//
//         if (playlists?.items) {
//             results.push(
//                 ...playlists.items.map((playlist: any) => ({
//                     id: playlist.id,
//                     name: playlist.name,
//                     type: "playlist",
//                     image: playlist.images[0]?.url,
//                     tracksCount: playlist.tracks.total,
//                 }))
//             );
//         }
//
//         if (tracks?.items) {
//             results.push(
//                 ...tracks.items.map((track: any) => ({
//                     id: track.id,
//                     name: track.name,
//                     type: "track",
//                     image: track.album.images[0]?.url,
//                     artist: track.artists[0]?.name,
//                 }))
//             );
//         }
//
//         return results;
//     } catch (error) {
//         console.error("Error fetching search results:", error);
//         throw new Error("Failed to fetch search results.");
//     }
// };
//
//
// const fetchUserData = async (): Promise<{
//     topArtists: any[];
//     recentTracks: any[];
// }> => {
//     try {
//         await setSpotifyAuthToken(); // Ensure the token is valid
//         const [topArtistsResponse, topTracksResponse] = await Promise.all([
//             spotifyApi.get("/me/top/artists"),
//             spotifyApi.get("/me/top/tracks"),
//         ]);
//
//         return {
//             topArtists: topArtistsResponse.data.items.map((artist: any) => ({
//                 id: artist.id,
//                 name: artist.name,
//                 image: artist.images[0]?.url,
//                 followers: artist.followers?.total,
//             })),
//             recentTracks: topTracksResponse.data.items.map((track: any) => ({
//                 id: track.id,
//                 name: track.name,
//                 artist: track.artists[0]?.name,
//                 image: track.album.images[0]?.url,
//             })),
//         };
//     } catch (error) {
//         console.error("Error fetching user data:", error);
//         throw new Error("Failed to fetch user data.");
//     }
// };
//
//
// export {
//     getUserProfile,
//     getUserTopArtists,
//     getUserPlaylists,
//     fetchTrendingArtists,
//     fetchPopularPlaylists,
//     fetchSearchResults,
//     fetchUserData,
// };

// import axios from "axios";
//
// // Spotify API base URL
// const SPOTIFY_ACCOUNTS_URL = "https://accounts.spotify.com/api/token";
//
// // Your Spotify app credentials
// const CLIENT_ID = "77693689203b4c61b7c292e35603f65e";
// const CLIENT_SECRET = "5318e4996d0b4e588cbae945996a62ad";
// const SPOTIFY_REDIRECT_URI = "http://localhost:5173/home";
// const SCOPE = "user-read-private user-read-email";
//
// // Utility to encode credentials to Base64
// const getAuthHeader = () => {
//     const authString = `${CLIENT_ID}:${CLIENT_SECRET}`;
//     return `Basic ${Buffer.from(authString).toString("base64")}`;
// };
//
// // Utility to check if the token is expired
// export const isTokenExpired = (): boolean => {
//     const tokenExpiry = localStorage.getItem("spotifyTokenExpiry");
//     return !tokenExpiry || Date.now() > parseInt(tokenExpiry, 10);
// };
//
// // Function to get a new access token using the refresh token
// export const refreshToken = async (): Promise<string | null> => {
//     const refreshToken = localStorage.getItem("spotifyRefreshToken");
//     if (!refreshToken) {
//         console.error("No refresh token available");
//         return null;
//     }
//
//     try {
//         const response = await axios.post(
//             SPOTIFY_ACCOUNTS_URL,
//             new URLSearchParams({
//                 grant_type: "refresh_token",
//                 refresh_token: refreshToken,
//             }).toString(),
//             {
//                 headers: {
//                     Authorization: getAuthHeader(),
//                     "Content-Type": "application/x-www-form-urlencoded",
//                 },
//             }
//         );
//
//         const { access_token, expires_in } = response.data;
//
//         // Calculate and store the new token expiration time
//         const expiryTime = Date.now() + expires_in * 1000;
//         localStorage.setItem("spotifyToken", access_token);
//         localStorage.setItem("spotifyTokenExpiry", expiryTime.toString());
//
//         console.log("Spotify token refreshed successfully");
//         return access_token;
//     } catch (error) {
//         console.error("Error refreshing Spotify token:", error);
//         return null;
//     }
// };
//
// // Function to get the initial token using an authorization code
// export const getTokenFromCode = async (code: string): Promise<string | null> => {
//     try {
//         const response = await axios.post(
//             SPOTIFY_ACCOUNTS_URL,
//             new URLSearchParams({
//                 grant_type: "authorization_code",
//                 code,
//                 redirect_uri: SPOTIFY_REDIRECT_URI,
//             }).toString(),
//             {
//                 headers: {
//                     Authorization: getAuthHeader(),
//                     "Content-Type": "application/x-www-form-urlencoded",
//                 },
//             }
//         );
//
//         const { access_token, refresh_token, expires_in } = response.data;
//
//         // Store tokens and expiration in localStorage
//         const expiryTime = Date.now() + expires_in * 1000;
//         localStorage.setItem("spotifyToken", access_token);
//         localStorage.setItem("spotifyRefreshToken", refresh_token);
//         localStorage.setItem("spotifyTokenExpiry", expiryTime.toString());
//
//         console.log("Spotify token retrieved successfully");
//         return access_token;
//     } catch (error) {
//         console.error("Error retrieving Spotify token:", error);
//         return null;
//     }
// };
//
// // Function to set the authorization header
// export const setSpotifyAuthToken = async () => {
//     if (isTokenExpired()) {
//         await refreshToken();
//     }
//     const token = localStorage.getItem("spotifyToken");
//     if (token) {
//         axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//     } else {
//         console.error("No valid token available");
//     }
// };


import axios from "axios";

const SPOTIFY_ACCOUNTS_URL = "https://accounts.spotify.com/api/token";
const SPOTIFY_API_BASE_URL = "https://api.spotify.com/v1";
const CLIENT_ID = "77693689203b4c61b7c292e35603f65e";
const CLIENT_SECRET = "5318e4996d0b4e588cbae945996a62ad";
const REDIRECT_URI = "http://localhost:5173/home";

// Create Axios instance for Spotify API
export const spotifyApi = axios.create({
    baseURL: SPOTIFY_API_BASE_URL,
});

// Helper to set Authorization header
export const setSpotifyAuthToken = async () => {
    if (isTokenExpired()) {
        await refreshToken();
    }
    const token = localStorage.getItem("spotify_token");
    if (token) {
        spotifyApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
        console.error("No valid token available");
    }
};

// Helper to check if token is expired
export const isTokenExpired = (): boolean => {
    const expiry = localStorage.getItem("spotify_token_expiry");
    return !expiry || Date.now() > parseInt(expiry, 10);
};

// Refresh token
export const refreshToken = async (): Promise<string | null> => {
    const refreshToken = localStorage.getItem("spotifyRefreshToken");
    if (!refreshToken) {
        console.error("No refresh token available");
        return null;
    }

    try {
        const response = await axios.post(
            SPOTIFY_ACCOUNTS_URL,
            new URLSearchParams({
                grant_type: "refresh_token",
                refresh_token: refreshToken,
            }).toString(),
            {
                headers: {
                    Authorization: `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`,
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            }
        );

        const { access_token, expires_in } = response.data;
        localStorage.setItem("spotifyToken", access_token);
        localStorage.setItem(
            "spotifyTokenExpiry",
            (Date.now() + expires_in * 1000).toString()
        );

        console.log("Token refreshed successfully");
        return access_token;
    } catch (error) {
        console.error("Error refreshing token:", error);
        return null;
    }
};

// Get token from authorization code
export const getTokenFromCode = async (code: string): Promise<string | null> => {
    try {
        const response = await axios.post(
            SPOTIFY_ACCOUNTS_URL,
            new URLSearchParams({
                grant_type: "authorization_code",
                code,
                redirect_uri: REDIRECT_URI,
            }).toString(),
            {
                headers: {
                    Authorization: `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`,
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            }
        );

        const { access_token, refresh_token, expires_in } = response.data;
        localStorage.setItem("spotifyToken", access_token);
        localStorage.setItem("spotifyRefreshToken", refresh_token);
        localStorage.setItem(
            "spotifyTokenExpiry",
            (Date.now() + expires_in * 1000).toString()
        );

        console.log("Token retrieved successfully");
        return access_token;
    } catch (error) {
        console.error("Error retrieving token:", error);
        return null;
    }
};

// Spotify API calls (e.g., Get User Profile)
export const getUserProfile = async () => {
    try {
        await setSpotifyAuthToken();
        const response = await spotifyApi.get("/me");
        return response.data;
    } catch (error) {
        console.error("Failed to fetch user profile:", error);
        throw error;
    }
};