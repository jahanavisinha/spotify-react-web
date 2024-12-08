import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import HomePage from "./components/HomePage";
import Dashboard from "./components/Dashboard";
import CallbackPage from "./components/CallbackPage";
import PrivateRoute from "./components/PrivateRoute";

const isAuthenticated = (): boolean => {
    const token = localStorage.getItem("spotifyToken");
    const expiryTime = parseInt(localStorage.getItem("spotifyTokenExpiry") || "0", 10);
    return Boolean(token && Date.now() < expiryTime);
};

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                {/* Login route */}
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<LoginPage />} />

                {/* Spotify callback route */}
                <Route path="/callback" element={<CallbackPage />} />

                {/* Home route */}
                <Route
                    path="/home"
                    element={isAuthenticated() ? <HomePage /> : <Navigate to="/login" />}
                />

                {/* Dashboard route */}
                <Route
                    path="/dashboard"
                    element={isAuthenticated() ? <Dashboard /> : <Navigate to="/login" />}
                />
            </Routes>
        </Router>
    );
};

export default App;