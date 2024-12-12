import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar: React.FC = () => {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <h1 className="navbar-title">
                    <Link to="/home">MusicMatch</Link>
                </h1>
                <ul className="navbar-links">
                    <li>
                        <Link to="/home" className="navbar-button">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/dashboard" className="navbar-button">
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link to="/profile" className="navbar-button">
                            Profile
                        </Link>
                    </li>
                    <li>
                        <Link to="/register" className="navbar-button">
                            Create Profile
                        </Link>
                    </li>
                    <li>
                        <Link to="/login" className="navbar-button">
                            Login
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;