// import React from "react";
// import { Navigate, Outlet } from "react-router-dom";
//
// const isAuthenticated = (): boolean => {
//     const token = localStorage.getItem("spotifyToken");
//     const expiryTime = parseInt(localStorage.getItem("spotifyTokenExpiry") || "0", 10);
//     return Boolean(token && Date.now() < expiryTime);
// };
//
// const PrivateRoute: React.FC = () => {
//     return isAuthenticated() ? <Outlet /> : <Navigate to="/login" />;
// };
//
// export default PrivateRoute;

import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"; // Ensure AuthContext is set up

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
