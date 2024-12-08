// import {useEffect, useState} from "react";
//
// const client_id = '77693689203b4c61b7c292e35603f65e';
// const client_secret = '5318e4996d0b4e588cbae945996a62ad';
// const [data, setData] = useState(null);
// async function getToken() {
//     const response = await fetch('https://accounts.spotify.com/api/token', {
//         method: 'POST',
//         body: new URLSearchParams({
//             'grant_type': 'client_credentials',
//         }),
//         headers: {
//             'Content-Type': 'application/x-www-form-urlencoded',
//             'Authorization': 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64')),
//         },
//     });
//     const tokenResponse = await response.json();
//     setData(tokenResponse.access_token);
//     return response.json();
// }
//
// async function getTrackInfo(access_token) {
//     const response = await fetch("https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTy/tracks", {
//         method: 'GET',
//         headers: { 'Authorization': 'Bearer ' + access_token },
//     });
//
//     return await response.json();
// }
//
// getToken().then(response => {
//     getTrackInfo(response.access_token).then(profile => {
//         console.log(profile)
//     })
// });
// export const useSpotifyAuth = () => {
//     //const [token, setToken] = useState<string | null>(null);
//     useEffect(() => {
//         // const hash = window.location.hash;
//         getToken();
//         if (data) {
//             // const token = new URLSearchParams(hash.substring(1)).get("access_token");
//             // const response = await getToken();
//             // const token = response.access_token;
//             // if (token) {
//             //     setToken(token);
//                 localStorage.setItem("spotify_token", data);
//             }
//     }, []);
//     return data || localStorage.getItem("spotify_token");
// };


import { useEffect, useState } from "react";

const SpotifyAuth = () => {
    const [data, setData] = useState<string | null>(null);
    const client_id = '77693689203b4c61b7c292e35603f65e';
    const client_secret = '5318e4996d0b4e588cbae945996a62ad';

    async function getToken() {
        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            body: new URLSearchParams({
                'grant_type': 'client_credentials',
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + btoa(`${client_id}:${client_secret}`),
            },
        });
        const tokenResponse = await response.json();
        setData(tokenResponse.access_token);
        return tokenResponse;
    }

    async function getTrackInfo(access_token: string) {
        const response = await fetch("https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTy/tracks", {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + access_token },
        });

        return await response.json();
    }

    useEffect(() => {
        getToken().then(response => {
            if (response.access_token) {
                getTrackInfo(response.access_token).then(profile => {
                    console.log(profile);
                });
            }
        });
    }, []);

    return data || localStorage.getItem("spotify_token");
};

export default SpotifyAuth;