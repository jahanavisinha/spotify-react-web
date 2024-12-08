// import React, { useState } from "react";
// import { loginUser } from "../services/authUtils";
// import { useNavigate } from "react-router-dom";
//
// const LoginPage = () => {
//     const [email, setEmail] = useState<string>("");
//     const [password, setPassword] = useState<string>("");
//     const navigate = useNavigate();
//
//     const handleLogin = () => {
//         const user = loginUser(email, password);
//         if (user) {
//             navigate("/home"); // Redirect to Home page on successful login
//         } else {
//             alert("Invalid credentials");
//         }
//     };
//
//     return (
//         <div>
//             <h1>Login</h1>
//             <input
//                 type="email"
//                 placeholder="Email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//             />
//             <input
//                 type="password"
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//             />
//             <button onClick={handleLogin}>Login</button>
//         </div>
//     );
// };
//
// export default LoginPage;

import React from "react";

const LoginPage: React.FC = () => {
    const SPOTIFY_CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
    const REDIRECT_URI = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;
    const SCOPES = import.meta.env.VITE_SCOPES;

    // Add console logs to debug the environment variables
    console.log("SPOTIFY_CLIENT_ID:", SPOTIFY_CLIENT_ID);
    console.log("REDIRECT_URI:", REDIRECT_URI);
    console.log("SCOPES:", SCOPES);

    if (!SPOTIFY_CLIENT_ID) {
        console.error("Missing SPOTIFY_CLIENT_ID in environment variables.");
    }

    const SPOTIFY_AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${SPOTIFY_CLIENT_ID}&response_type=token&redirect_uri=${encodeURIComponent(
        REDIRECT_URI
    )}&scope=${encodeURIComponent(SCOPES)}`;

    return (
        <div>
            <h1>Welcome to Spotify App</h1>
            <a href={SPOTIFY_AUTH_URL}>
                <button>Login with Spotify</button>
            </a>
        </div>
    );
};

export default LoginPage;
