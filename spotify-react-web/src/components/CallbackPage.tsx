import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CallbackPage: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const hash = window.location.hash;
        const params = new URLSearchParams(hash.substring(1));
        const token = params.get("access_token");
        const expiresIn = params.get("expires_in");

        if (token && expiresIn) {
            // Store token and expiry
            localStorage.setItem("spotifyToken", token);
            localStorage.setItem(
                "spotifyTokenExpiry",
                `${Date.now() + parseInt(expiresIn) * 1000}`
            );

            console.log("Token stored:", token);
            console.log("Expiry time stored:", localStorage.getItem("spotifyTokenExpiry"));

            // Redirect to home
            navigate("/home");
        } else {
            console.error("No token found. Redirecting to login.");
            navigate("/login");
        }
    }, [navigate]);

    return <p>Processing your Spotify login...</p>;
};

export default CallbackPage;