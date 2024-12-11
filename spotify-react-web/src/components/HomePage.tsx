// import React from "react";
// import { isLoggedIn } from "../services/authUtils";
//
// const HomePage = () => {
//     return (
//         <div>
//             <h1>Home Page</h1>
//             {isLoggedIn() ? <p>Welcome back!</p> : <p>Welcome, guest! Please login to enjoy more features.</p>}
//         </div>
//     );
// };
//
// export default HomePage;
// import React, { useEffect, useState } from "react";
//
// interface SpotifyUserData {
//     display_name: string;
//     email: string;
//     id: string;
//     images: { url: string }[]; // For profile picture
// }
//
// const HomePage: React.FC = () => {
//     const [userData, setUserData] = useState<SpotifyUserData | null>(null);
//
//     useEffect(() => {
//         const token = localStorage.getItem("spotifyToken");
//
//         const fetchUserData = async () => {
//             try {
//                 const response = await fetch("https://api.spotify.com/v1/me", {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 });
//                 if (!response.ok) throw new Error("Failed to fetch user data");
//
//                 const data: SpotifyUserData = await response.json();
//                 setUserData(data);
//             } catch (error) {
//                 console.error("Error fetching user data:", error);
//             }
//         };
//
//         if (token) fetchUserData();
//     }, []);
//
//     return (
//         <div>
//             <h1>Welcome to Spotify App</h1>
//             {userData ? (
//                 <div>
//                     <h2>{`Hello, ${userData.display_name}`}</h2>
//                     <p>{`Email: ${userData.email}`}</p>
//                     {userData.images.length > 0 && (
//                         <img src={userData.images[0].url} alt="Profile" style={{ width: "100px" }} />
//                     )}
//                 </div>
//             ) : (
//                 <p>Loading user data...</p>
//             )}
//         </div>
//     );
// };
//
// export default HomePage;


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchTrendingArtists, fetchPopularPlaylists, fetchUserData } from "../services/spotifyApi.ts";

const HomePage = ({ isAuthenticated, accessToken }) => {
    const [trendingArtists, setTrendingArtists] = useState([]);
    const [popularPlaylists, setPopularPlaylists] = useState([]);
    const [userContent, setUserContent] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            fetchUserData(accessToken)
                .then((data) => setUserContent(data))
                .catch((error) => {
                    console.error("Failed to fetch user data:", error);
                });
        } else {
            fetchTrendingArtists()
                .then((data) => setTrendingArtists(data))
                .catch((error) => {
                    console.error("Failed to fetch trending artists:", error);
                });
            fetchPopularPlaylists()
                .then((data) => setPopularPlaylists(data))
                .catch((error) => {
                    console.error("Failed to fetch popular playlists:", error);
                });
        }
    }, [isAuthenticated, accessToken]);

    const handleSearch = (e) => {
        e.preventDefault();
        navigate(`/search?query=${searchTerm}`);
    };

    return (
        <div className="home-page">
            <header>
                <h1>Welcome to MusicMatch</h1>
                {isAuthenticated ? (
                    <p>Discover music based on your recent activity</p>
                ) : (
                    <p>Explore trending music and playlists</p>
                )}
            </header>

            <form onSubmit={handleSearch} className="search-bar">
                <input
                    type="text"
                    placeholder="Search for users, artists, or playlists"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button type="submit">Search</button>
            </form>

            {!isAuthenticated ? (
                <div>
                    <section className="trending-artists">
                        <h3>Trending Artists</h3>
                        <ul>
                            {trendingArtists.map((artist) => (
                                <li key={artist.id}>{artist.name}</li>
                            ))}
                        </ul>
                    </section>

                    <section className="popular-playlists">
                        <h3>Popular Playlists</h3>
                        <ul>
                            {popularPlaylists.map((playlist) => (
                                <li key={playlist.id}>{playlist.name}</li>
                            ))}
                        </ul>
                    </section>
                </div>
            ) : (
                <div>
                    <section className="user-content">
                        <h3>Your Personalized Content</h3>
                        <ul>
                            {userContent?.recentTracks?.map((track) => (
                                <li key={track.id}>{track.name} - {track.artist}</li>
                            ))}
                        </ul>
                    </section>

                    <section className="user-top">
                        <h3>Your Top Artists</h3>
                        <ul>
                            {userContent?.topArtists?.map((artist) => (
                                <li key={artist.id}>{artist.name}</li>
                            ))}
                        </ul>
                    </section>
                </div>
            )}
        </div>
    );
};

export default HomePage;
