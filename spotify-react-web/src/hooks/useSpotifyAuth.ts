// import { useEffect, useState } from "react";
// const SpotifyAuth = () => {
//     const [data, setData] = useState<string | null>(null);
//     const client_id = '77693689203b4c61b7c292e35603f65e';
//     const client_secret = '5318e4996d0b4e588cbae945996a62ad';
//
//     async function getToken() {
//         const response = await fetch('https://accounts.spotify.com/api/token', {
//             method: 'POST',
//             body: new URLSearchParams({
//                 'grant_type': 'client_credentials',
//             }),
//             headers: {
//                 'Content-Type': 'application/x-www-form-urlencoded',
//                 'Authorization': 'Basic ' + btoa(`${client_id}:${client_secret}`),
//             },
//         });
//         const tokenResponse = await response.json();
//         setData(tokenResponse.access_token);
//         return tokenResponse;
//     }
//
//     async function getTrackInfo(access_token: string) {
//         const response = await fetch("https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTy/tracks", {
//             method: 'GET',
//             headers: { 'Authorization': 'Bearer ' + access_token },
//         });
//
//         return await response.json();
//     }
//
//     useEffect(() => {
//         getToken().then(response => {
//             if (response.access_token) {
//                 getTrackInfo(response.access_token).then(profile => {
//                     console.log(profile);
//                 });
//             }
//         });
//     }, []);
//
//     return data || localStorage.getItem("spotify_token");
// };
//
// export default SpotifyAuth;

import { useEffect, useState } from "react";

const SpotifyAuth = () => {
    const [token, setToken] = useState<string | null>(localStorage.getItem("spotify_token"));
    const client_id = "77693689203b4c61b7c292e35603f65e";
    const client_secret = "5318e4996d0b4e588cbae945996a62ad";

    // Function to fetch Spotify access token
    async function getToken() {
        try {
            const response = await fetch("https://accounts.spotify.com/api/token", {
                method: "POST",
                body: new URLSearchParams({
                    grant_type: "client_credentials",
                }),
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    Authorization: "Basic " + btoa(`${client_id}:${client_secret}`),
                },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch token");
            }

            const tokenResponse = await response.json();
            const accessToken = tokenResponse.access_token;

            // Save token to state and local storage
            setToken(accessToken);
            localStorage.setItem("spotify_token", accessToken);

            // Save the token's expiry time (3600 seconds = 1 hour)
            const expiryTime = Date.now() + tokenResponse.expires_in * 1000;
            localStorage.setItem("spotify_token_expiry", expiryTime.toString());

            return accessToken;
        } catch (error) {
            console.error("Error fetching token:", error);
            return null;
        }
    }

    // Function to fetch track information using the access token
    async function getTrackInfo(access_token: string) {
        try {
            const response = await fetch(
                "https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTy/tracks",
                {
                    method: "GET",
                    headers: { Authorization: "Bearer " + access_token },
                }
            );

            if (!response.ok) {
                throw new Error("Failed to fetch track information");
            }

            return await response.json();
        } catch (error) {
            console.error("Error fetching track information:", error);
            return null;
        }
    }

    // Helper function to check token validity
    const isTokenValid = () => {
        const expiryTime = parseInt(localStorage.getItem("spotify_token_expiry") || "0", 10);
        return token && Date.now() < expiryTime;
    };

    useEffect(() => {
        if (!isTokenValid()) {
            getToken().then((newToken) => {
                if (newToken) {
                    getTrackInfo(newToken).then((trackInfo) => {
                        console.log("Track Info:", trackInfo);
                    });
                }
            });
        } else if (token) {
            getTrackInfo(token).then((trackInfo) => {
                console.log("Track Info:", trackInfo);
            });
        }
    }, [token]);

    return token;
};

export default SpotifyAuth;