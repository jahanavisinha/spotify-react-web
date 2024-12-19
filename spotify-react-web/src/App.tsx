// import React from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import LoginPage from "./components/LoginPage";
// import HomePage from "./components/HomePage";
// import Dashboard from "./components/Dashboard";
// import CallbackPage from "./components/CallbackPage";
// import PrivateRoute from "./components/PrivateRoute";
// import ProfilePage from "./components/ProfilePage";
// import SearchPage from "./components/SearchPage.tsx";
//
// const App: React.FC = () => {
//     return (
//         <Router>
//             <Navbar />
//             <Routes>
//                 <Route path="/" element={<Navigate to="/login" />} />
//                 <Route path="/login" element={<LoginPage />} />
//                 <Route path="/callback" element={<CallbackPage />} />
//                 <Route path="/home" element={<HomePage />} />
//                 <Route path="/dashboard" element={<Dashboard />} />
//                 <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
//                 <Route path="/profile/:profileId" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
//                 <Route path="/search" element={<SearchPage />} />
//
//             </Routes>
//         </Router>
//     );
// };
//
// export default App;

import React, {useEffect, useState} from "react";
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import Navbar from "./components/Navbar";
import LoginPage from "./components/LoginPage";
import HomePage from "./components/HomePage";
import Dashboard from "./components/Dashboard";
import CallbackPage from "./components/CallbackPage";
import PrivateRoute from "./components/PrivateRoute";
import ProfilePage from "./components/ProfilePage";
import SearchPage from "./components/SearchPage";
import UserRegistration from "./registration/UserRegistration.tsx";
import FeedPage from "./components/FeedPage.tsx";

const App: React.FC = () => {
    const [accessToken, setAccessToken] = useState<string | null>(localStorage.getItem('spotify_token'));
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    const client_id = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
    const client_secret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;

    const getSpotifyToken = async () => {
        console.log("Reached hereeeeee!")
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

            const data = await response.json();
            const token = data.access_token;
            console.log("access token", accessToken);
            const expiryTime = Date.now() + data.expires_in * 1000;

            localStorage.setItem('spotify_token', token);
            localStorage.setItem('spotify_token_expiry', expiryTime.toString());

            setAccessToken(token);
            setIsAuthenticated(true);

            return token;
        } catch (error) {
            console.error("Error getting Spotify token:", error);
            return null;
        }
    };

    useEffect(() => {
        const checkAndRefreshToken = async () => {
            const token = localStorage.getItem('spotify_token');
            const tokenExpiry = localStorage.getItem('spotify_token_expiry');

            if (!token || !tokenExpiry || Date.now() > parseInt(tokenExpiry)) {
                await getSpotifyToken();
            } else {
                setAccessToken(token);
                setIsAuthenticated(true);
            }
        };

        checkAndRefreshToken();

        // Set up token refresh interval (every 50 minutes)
        const refreshInterval = setInterval(getSpotifyToken, 50 * 60 * 1000);

        return () => clearInterval(refreshInterval);
    }, []);
    return (
        <Router>
            <Navbar/>
            <Routes>
                <Route path="/" element={<Navigate to="/home"/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/register" element={<UserRegistration/>}/>
                <Route path="/callback" element={<CallbackPage/>}/>
                <Route
                    path="/home"
                    element={
                        <HomePage
                            isAuthenticated={isAuthenticated}
                            accessToken={accessToken || ''}
                        />
                    }
                />
                <Route path="/dashboard" element={<Dashboard/>}/>
                <Route path="/profile" element={<PrivateRoute><ProfilePage/></PrivateRoute>}/>
                <Route path="/profile/:profileId"
                       element={<PrivateRoute><ProfilePage/></PrivateRoute>}/>
                <Route path="/search" element={<SearchPage/>}/>
                <Route path="/feed" element={<FeedPage/>}/>
            </Routes>
        </Router>
    );
};

export default App;