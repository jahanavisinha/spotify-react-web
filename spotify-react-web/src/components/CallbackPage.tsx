// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
//
// const CallbackPage: React.FC = () => {
//     const navigate = useNavigate();
//
//     useEffect(() => {
//         const hash = window.location.hash;
//         const params = new URLSearchParams(hash.substring(1));
//         const token = params.get("access_token");
//         const expiresIn = params.get("expires_in");
//
//         if (token && expiresIn) {
//             // Store token and expiry
//             localStorage.setItem("spotifyToken", token);
//             localStorage.setItem(
//                 "spotifyTokenExpiry",
//                 `${Date.now() + parseInt(expiresIn) * 1000}`
//             );
//
//             console.log("Token stored:", token);
//             console.log("Expiry time stored:", localStorage.getItem("spotifyTokenExpiry"));
//
//             // Redirect to home
//             navigate("/home");
//         } else {
//             console.error("No token found. Redirecting to login.");
//             navigate("/login");
//         }
//     }, [navigate]);
//
//     return <p>Processing your Spotify login...</p>;
// };
//
// export default CallbackPage;

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getTokenFromCode, setSpotifyAuthToken } from "../services/spotifyApiHelper";

const CallbackPage: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const code = searchParams.get("code"); // Extract the authorization code from the URL

        if (code) {
            handleAuthorizationCode(code);
        } else {
            console.error("No authorization code found in the URL. Redirecting to login.");
            navigate("/login");
        }
    }, [navigate]);

    const handleAuthorizationCode = async (code: string) => {
        try {
            // Exchange the authorization code for an access token
            const { accessToken, refreshToken, expiresIn } = await getTokenFromCode(code);

            // Store tokens and expiry time in localStorage
            localStorage.setItem("spotifyToken", accessToken);
            localStorage.setItem("spotifyRefreshToken", refreshToken);
            localStorage.setItem(
                "spotifyTokenExpiry",
                `${Date.now() + expiresIn * 1000}` // Convert expires_in to absolute timestamp
            );

            // Set the access token for Axios
            setSpotifyAuthToken(accessToken);

            console.log("Access token and refresh token stored successfully.");
            console.log(
                "Token expiry time:",
                new Date(parseInt(localStorage.getItem("spotifyTokenExpiry") || "0")).toLocaleString()
            );

            // Redirect to the home page
            navigate("/home");
        } catch (error) {
            console.error("Error handling authorization code:", error);
            navigate("/login"); // Redirect to login on error
        }
    };

    return <p>Processing your Spotify login...</p>; // Provide user feedback during the process
};

export default CallbackPage;