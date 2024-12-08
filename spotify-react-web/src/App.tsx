import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import HomePage from "./components/HomePage";
import Dashboard from "./components/Dashboard.tsx";

const extractTokenFromUrl = (): string | null => {
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.substring(1)); // Remove the `#`
    return params.get("access_token");
};

const isAuthenticated = (): boolean => {
    return Boolean(localStorage.getItem("spotifyToken"));
};

const App: React.FC = () => {
    useEffect(() => {
        const token = extractTokenFromUrl();
        if (token) {
            localStorage.setItem("spotifyToken", token);
            window.history.replaceState({}, document.title, "/home"); // Clean up URL
        }
    }, []);

    return (
        <Router>
            <Routes>
                {/* Login route */}
                <Route path="/" element={<LoginPage />} />

                {/* Home route */}
                <Route
                    path="/home"
                    element={isAuthenticated() ? <HomePage /> : <Navigate to="/login" />}
                />

                <Route
                    path="/dashboard"
                    element={isAuthenticated() ? <Dashboard /> : <Navigate to="/login" />}
                />
            </Routes>
        </Router>
    );
};

export default App;
