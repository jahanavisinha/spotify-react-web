// // import React, { useState } from "react";
// // import { loginUser } from "../services/authUtils";
// // import { useNavigate } from "react-router-dom";
// //
// // const LoginPage = () => {
// //     const [email, setEmail] = useState<string>("");
// //     const [password, setPassword] = useState<string>("");
// //     const navigate = useNavigate();
// //
// //     const handleLogin = () => {
// //         const user = loginUser(email, password);
// //         if (user) {
// //             navigate("/home"); // Redirect to Home page on successful login
// //         } else {
// //             alert("Invalid credentials");
// //         }
// //     };
// //
// //     return (
// //         <div>
// //             <h1>Login</h1>
// //             <input
// //                 type="email"
// //                 placeholder="Email"
// //                 value={email}
// //                 onChange={(e) => setEmail(e.target.value)}
// //             />
// //             <input
// //                 type="password"
// //                 placeholder="Password"
// //                 value={password}
// //                 onChange={(e) => setPassword(e.target.value)}
// //             />
// //             <button onClick={handleLogin}>Login</button>
// //         </div>
// //     );
// // };
// //
// // export default LoginPage;
//
// import React from "react";
//
// const LoginPage: React.FC = () => {
//     const SPOTIFY_CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
//     const REDIRECT_URI = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;
//     const SCOPES = import.meta.env.VITE_SCOPES;
//
//     // Add console logs to debug the environment variables
//     console.log("SPOTIFY_CLIENT_ID:", SPOTIFY_CLIENT_ID);
//     console.log("REDIRECT_URI:", REDIRECT_URI);
//     console.log("SCOPES:", SCOPES);
//
//     if (!SPOTIFY_CLIENT_ID) {
//         console.error("Missing SPOTIFY_CLIENT_ID in environment variables.");
//     }
//
//     const SPOTIFY_AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${SPOTIFY_CLIENT_ID}&response_type=token&redirect_uri=${encodeURIComponent(
//         REDIRECT_URI
//     )}&scope=${encodeURIComponent(SCOPES)}`;
//
//     return (
//         <div>
//             <h1>Welcome to Spotify App</h1>
//             <a href={SPOTIFY_AUTH_URL}>
//                 <button>Login with Spotify</button>
//             </a>
//         </div>
//     );
// };
//
// export default LoginPage;


import React, { useState, useEffect } from "react";
import axios from "axios";

const LoginPage: React.FC = () => {
    // Spotify Authentication Configuration
    const SPOTIFY_CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
    const REDIRECT_URI = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;
    const SCOPES = import.meta.env.VITE_SCOPES;

    // State for storing top trends
    const [topTracks, setTopTracks] = useState<any[]>([]);
    const [topArtists, setTopArtists] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // Spotify Authorization URL
    const SPOTIFY_AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${SPOTIFY_CLIENT_ID}&response_type=token&redirect_uri=${encodeURIComponent(
        REDIRECT_URI
    )}&scope=${encodeURIComponent(SCOPES)}`;

    // Fetch top trends (without authentication for public trends)
    useEffect(() => {
        const fetchTopTrends = async () => {
            try {
                const clientCredentialsResponse = await axios.post(
                    "https://accounts.spotify.com/api/token",
                    new URLSearchParams({
                        grant_type: "client_credentials",
                        client_id: SPOTIFY_CLIENT_ID,
                        client_secret: import.meta.env.VITE_SPOTIFY_CLIENT_SECRET,
                    }),
                    {
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded",
                        },
                    }
                );

                const accessToken = clientCredentialsResponse.data.access_token;

                // Fetch top tracks
                const topTracksResponse = await axios.get(
                    "https://api.spotify.com/v1/playlists/37i9dQZEVXbMDoHWrNQ83B/tracks",
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    }
                );

                // Fetch top artists
                const topArtistsResponse = await axios.get(
                    "https://api.spotify.com/v1/artists?ids=0oSGxhjAwM9xMUzdIWKIjm,1Xyo4u8uXC1ZmMpatF05PJ,2YZyLoL8N0Wzxdu9V7lp8M",
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    }
                );

                setTopTracks(topTracksResponse.data.items.slice(0, 5));
                setTopArtists(topArtistsResponse.data.artists);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching top trends:", error);
                setIsLoading(false);
            }
        };

        fetchTopTrends();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-500 to-blue-600 flex flex-col items-center justify-center p-4">
            <div className="bg-white shadow-2xl rounded-xl p-8 w-full max-w-md mb-8">
                <h1 className="text-3xl font-bold text-center mb-6 text-green-600">
                    Spotify Trends Explorer
                </h1>
                <a href={SPOTIFY_AUTH_URL} className="w-full block">
                    <button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg transition duration-300">
                        Login with Spotify
                    </button>
                </a>
            </div>

            {isLoading ? (
                <div className="text-white">Loading top trends...</div>
            ) : (
                <div className="w-full max-w-4xl">
                    <div className="mb-8">
                        <h2 className="text-2xl font-semibold text-white mb-4">Top Tracks</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {topTracks.map((track) => (
                                <div
                                    key={track.track.id}
                                    className="bg-white rounded-lg shadow-md p-4 flex items-center space-x-4 hover:scale-105 transition-transform"
                                >
                                    <img
                                        src={track.track.album.images[0]?.url || "placeholder.jpg"}
                                        alt={track.track.name}
                                        className="w-16 h-16 rounded-md"
                                    />
                                    <div>
                                        <p className="text-gray-800 font-semibold truncate max-w-[150px]">
                                            {track.track.name}
                                        </p>
                                        <p className="text-gray-600 text-sm">
                                            {track.track.artists[0]?.name || "Unknown Artist"}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-white mb-4">Top Artists</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {topArtists.map((artist) => (
                                <div
                                    key={artist.id}
                                    className="bg-white rounded-lg shadow-md p-4 flex items-center space-x-4 hover:scale-105 transition-transform"
                                >
                                    <img
                                        src={artist.images[0]?.url || "placeholder.jpg"}
                                        alt={artist.name}
                                        className="w-16 h-16 rounded-full"
                                    />
                                    <div>
                                        <p className="text-gray-800 font-semibold">
                                            {artist.name}
                                        </p>
                                        <p className="text-gray-600 text-sm">
                                            {artist.followers.total.toLocaleString()} Followers
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LoginPage;
