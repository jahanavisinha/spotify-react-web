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
import { fetchTrendingArtists, fetchPopularPlaylists, fetchUserData } from "../services/spotifyApi";

const HomePage: React.FC<{ isAuthenticated: boolean; accessToken: string }> = ({
                                                                                   isAuthenticated,
                                                                                   accessToken,
                                                                               }) => {
    const [trendingArtists, setTrendingArtists] = useState([]);
    const [popularPlaylists, setPopularPlaylists] = useState([]);
    const [userContent, setUserContent] = useState<any>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (isAuthenticated) {
                    const data = await fetchUserData(accessToken);
                    setUserContent(data);
                } else {
                    const artists = await fetchTrendingArtists();
                    setTrendingArtists(artists);
                    const playlists = await fetchPopularPlaylists();
                    setPopularPlaylists(playlists);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [isAuthenticated, accessToken]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        navigate(`/search?query=${searchTerm}`);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-500 to-blue-600 p-6">
            <header className="text-center text-white mb-6">
                <h1 className="text-4xl font-bold">Welcome to MusicMatch</h1>
                <p className="mt-2 text-lg">
                    {isAuthenticated
                        ? "Discover music based on your recent activity."
                        : "Explore trending music and playlists."}
                </p>
            </header>

            <form
                onSubmit={handleSearch}
                className="flex justify-center mb-8"
            >
                <input
                    type="text"
                    placeholder="Search for users, artists, or playlists"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full max-w-md px-4 py-2 rounded-l-md focus:outline-none"
                />
                <button
                    type="submit"
                    className="bg-green-600 text-white font-semibold px-6 py-2 rounded-r-md hover:bg-green-700 transition"
                >
                    Search
                </button>
            </form>

            {loading ? (
                <div className="text-white text-center">
                    <p>Loading content...</p>
                </div>
            ) : (
                <div className="space-y-10">
                    {!isAuthenticated ? (
                        <>
                            <section>
                                <h2 className="text-2xl font-bold text-white mb-4">Trending Artists</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {trendingArtists.map((artist) => (
                                        <div
                                            key={artist.id}
                                            className="bg-white p-4 rounded-md shadow-md flex items-center space-x-4 hover:scale-105 transition-transform"
                                        >
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-gray-800">{artist.name}</h3>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-white mb-4">Popular Playlists</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {popularPlaylists.map((playlist) => (
                                        <div
                                            key={playlist.id}
                                            className="bg-white p-4 rounded-md shadow-md flex items-center space-x-4 hover:scale-105 transition-transform"
                                        >
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-gray-800">{playlist.name}</h3>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </>
                    ) : (
                        <>
                            <section>
                                <h2 className="text-2xl font-bold text-white mb-4">
                                    Your Personalized Content
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {userContent?.recentTracks?.map((track) => (
                                        <div
                                            key={track.id}
                                            className="bg-white p-4 rounded-md shadow-md flex items-center space-x-4 hover:scale-105 transition-transform"
                                        >
                                            <div>
                                                <h3 className="font-semibold text-gray-800">{track.name}</h3>
                                                <p className="text-gray-600 text-sm">{track.artist}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-white mb-4">Your Top Artists</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {userContent?.topArtists?.map((artist) => (
                                        <div
                                            key={artist.id}
                                            className="bg-white p-4 rounded-md shadow-md flex items-center space-x-4 hover:scale-105 transition-transform"
                                        >
                                            <div>
                                                <h3 className="font-semibold text-gray-800">{artist.name}</h3>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default HomePage;
