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
import { setSpotifyAuthToken } from "../services/spotifyApi"; // Import the function to set the token in Axios

const CallbackPage: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const hash = window.location.hash; // Extract the hash part of the URL
        const params = new URLSearchParams(hash.substring(1)); // Remove the '#' and parse params
        const token = params.get("access_token");
        const expiresIn = params.get("expires_in");

        if (token && expiresIn) {
            try {
                // Store token and expiry in localStorage
                localStorage.setItem("spotifyToken", token);
                localStorage.setItem(
                    "spotifyTokenExpiry",
                    `${Date.now() + parseInt(expiresIn) * 1000}` // Convert expires_in to absolute timestamp
                );

                // Set the token for all Axios requests
                setSpotifyAuthToken(token);

                console.log("Token successfully stored:", token);
                console.log(
                    "Expiry time stored:",
                    new Date(parseInt(localStorage.getItem("spotifyTokenExpiry") || "0")).toLocaleString()
                );

                // Redirect to the home page after storing the token
                navigate("/home");
            } catch (error) {
                console.error("Error storing token:", error);
                navigate("/login"); // Redirect to login on error
            }
        } else {
            console.error("No token or expiry found in the URL hash. Redirecting to login.");
            navigate("/login");
        }
    }, [navigate]);

    return <p>Processing your Spotify login...</p>; // Provide feedback to the user
};

export default CallbackPage;
