// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "./Navbar.css";
//
// const Navbar: React.FC = () => {
//     const navigate = useNavigate();
//
//     const handleLogout = () => {
//         // Clear local storage or session storage (if tokens are stored there)
//         localStorage.removeItem("accessToken");
//         localStorage.removeItem("refreshToken");
//
//         // Redirect to login page
//         navigate("/login");
//     };
//
//     return (
//         <nav className="navbar">
//             <div className="navbar-container">
//                 <h1 className="navbar-title">
//                     <Link to="/home">MusicMatch</Link>
//                 </h1>
//                 <ul className="navbar-links">
//                     <li>
//                         <Link to="/home" className="navbar-button">
//                             Home
//                         </Link>
//                     </li>
//                     <li>
//                         <Link to="/dashboard" className="navbar-button">
//                             Dashboard
//                         </Link>
//                     </li>
//                     <li>
//                         <Link to="/feed" className="navbar-button">
//                             Feed
//                         </Link>
//                     </li>
//                     <li>
//                         <Link to="/profile" className="navbar-button">
//                             Profile
//                         </Link>
//                     </li>
//                     <li>
//                         <Link to="/register" className="navbar-button">
//                             Create Profile
//                         </Link>
//                     </li>
//                     <li>
//                         <Link to="/login" className="navbar-button">
//                             Login
//                         </Link>
//                     </li>
//                     <li>
//                         <button onClick={handleLogout} className="logout-button">
//                             Logout
//                         </button>
//                     </li>
//                 </ul>
//             </div>
//         </nav>
//     );
// };
//
// export default Navbar;


import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar: React.FC = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear local storage or session storage (if tokens are stored there)
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        // Redirect to login page
        navigate("/login");
    };

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
                        <Link to="/feed" className="navbar-button">
                            Feed
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
                    <li>
                        <button onClick={handleLogout} className="navbar-button logout-button">
                            Logout
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
