import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import HomePage from "./components/HomePage";
import ProfilePage from "./components/ProfilePage";
import AdminPage from "./components/AdminPage";
import PrivateRoute from "./components/PrivateRoute"; // For protected routes
import { hasRole } from "./services/authUtils";

const App = () => {
    const isAuthenticated = () => {
        // Replace with your actual authentication logic
        return Boolean(localStorage.getItem("authToken"));
    };

    return (
        <Router>
            <Routes>
                {/* Public routes */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                {/* Redirect root path */}
                <Route path="/" element={isAuthenticated() ? <Navigate to="/home" /> : <Navigate to="/login" />} />

                {/* Private routes */}
                <Route element={<PrivateRoute />}>
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                </Route>

                {/* Admin route with role-based protection */}
                <Route
                    path="/admin"
                    element={
                        isAuthenticated() && hasRole("admin") ? (
                            <AdminPage />
                        ) : (
                            <Navigate to="/login" />
                        )
                    }
                />

                {/* Catch-all for undefined routes */}
                <Route path="*" element={<h1>404: Page Not Found</h1>} />
            </Routes>
        </Router>
    );
};

export default App;