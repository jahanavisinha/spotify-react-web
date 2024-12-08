/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_SPOTIFY_CLIENT_ID : string;
    //77693689203b4c61b7c292e35603f65e
    readonly VITE_SPOTIFY_CLIENT_SECRET : string;
    //5318e4996d0b4e588cbae945996a62ad
    readonly VITE_SCOPES : string;
    // user-read-private user-read-email
    readonly VITE_SPOTIFY_REDIRECT_URI : string;
    // http://localhost:5173/home
}
