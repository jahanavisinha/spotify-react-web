import axios from "axios";

// Spotify API base URL
const SPOTIFY_ACCOUNTS_URL = "https://accounts.spotify.com/api/token";

// Your Spotify app credentials
const CLIENT_ID = "77693689203b4c61b7c292e35603f65e";
const CLIENT_SECRET = "5318e4996d0b4e588cbae945996a62ad";
const SPOTIFY_REDIRECT_URI = "http://localhost:5173/home";
const SCOPE = "user-read-private user-read-email";

// Utility to encode credentials to Base64
const getAuthHeader = () => {
    const authString = `${CLIENT_ID}:${CLIENT_SECRET}`;
    return `Basic ${Buffer.from(authString).toString("base64")}`;
};

// Utility to check if the token is expired
export const isTokenExpired = (): boolean => {
    const tokenExpiry = localStorage.getItem("spotifyTokenExpiry");
    return !tokenExpiry || Date.now() > parseInt(tokenExpiry, 10);
};

// Function to get a new access token using the refresh token
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
                    Authorization: getAuthHeader(),
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            }
        );

        const { access_token, expires_in } = response.data;

        // Calculate and store the new token expiration time
        const expiryTime = Date.now() + expires_in * 1000;
        localStorage.setItem("spotifyToken", access_token);
        localStorage.setItem("spotifyTokenExpiry", expiryTime.toString());

        console.log("Spotify token refreshed successfully");
        return access_token;
    } catch (error) {
        console.error("Error refreshing Spotify token:", error);
        return null;
    }
};

// Function to get the initial token using an authorization code
export const getTokenFromCode = async (code: string): Promise<string | null> => {
    try {
        const response = await axios.post(
            SPOTIFY_ACCOUNTS_URL,
            new URLSearchParams({
                grant_type: "authorization_code",
                code,
                redirect_uri: SPOTIFY_REDIRECT_URI,
            }).toString(),
            {
                headers: {
                    Authorization: getAuthHeader(),
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            }
        );

        const { access_token, refresh_token, expires_in } = response.data;

        // Store tokens and expiration in localStorage
        const expiryTime = Date.now() + expires_in * 1000;
        localStorage.setItem("spotifyToken", access_token);
        localStorage.setItem("spotifyRefreshToken", refresh_token);
        localStorage.setItem("spotifyTokenExpiry", expiryTime.toString());

        console.log("Spotify token retrieved successfully");
        return access_token;
    } catch (error) {
        console.error("Error retrieving Spotify token:", error);
        return null;
    }
};

// Function to set the authorization header
export const setSpotifyAuthToken = async () => {
    if (isTokenExpired()) {
        await refreshToken();
    }
    const token = localStorage.getItem("spotifyToken");
    if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
        console.error("No valid token available");
    }
};