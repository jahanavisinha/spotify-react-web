import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { isLoggedIn } from "../services/authUtils";

// const PrivateRoute = () => {
//     if (!isLoggedIn()) {
//         return <Navigate to="/login" />;
//     }
//
//     return <Outlet />;
// };
//
// export default PrivateRoute;

import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const isAuthenticated = (): boolean => {
    const token = localStorage.getItem("spotifyToken");
    const expiryTime = parseInt(localStorage.getItem("spotifyTokenExpiry") || "0", 10);
    return Boolean(token && Date.now() < expiryTime);
};

const PrivateRoute: React.FC = () => {
    return isAuthenticated() ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;