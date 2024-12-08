export const generateSpotifyAuthUrl = () => {
    const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;
    const scopes = [
        "user-read-private",
        "user-read-email",
        "playlist-read-private",
        "user-top-read",
        "user-library-read",
    ];
    return `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}`;
};