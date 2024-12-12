import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext({
    isAuthenticated: false,
    setAuthToken: (token: string, expiry: number) => {},
});

export const AuthProvider: React.FC = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    const setAuthToken = (token: string, expiry: number) => {
        localStorage.setItem("spotifyToken", token);
        localStorage.setItem("spotifyTokenExpiry", expiry.toString());
        setIsAuthenticated(true);
    };

    useEffect(() => {
        const token = localStorage.getItem("spotifyToken");
        const expiryTime = parseInt(localStorage.getItem("spotifyTokenExpiry") || "0", 10);
        if (token && Date.now() < expiryTime) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, setAuthToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);