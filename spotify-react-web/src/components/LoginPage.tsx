import React, { useState, useEffect } from "react";
import axios from "axios";

const LoginPage: React.FC = () => {
    const SPOTIFY_CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
    const REDIRECT_URI = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;
    const SCOPES = import.meta.env.VITE_SCOPES;

    const [topTracks, setTopTracks] = useState<any[]>([]);
    const [topArtists, setTopArtists] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const SPOTIFY_AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${SPOTIFY_CLIENT_ID}&response_type=token&redirect_uri=${encodeURIComponent(
        REDIRECT_URI
    )}&scope=${encodeURIComponent(SCOPES)}`;

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
                        headers: { "Content-Type": "application/x-www-form-urlencoded" },
                    }
                );

                const accessToken = clientCredentialsResponse.data.access_token;

                const [topTracksResponse, topArtistsResponse] = await Promise.all([
                    axios.get(
                        "https://api.spotify.com/v1/playlists/37i9dQZEVXbMDoHWrNQ83B/tracks",
                        {
                            headers: { Authorization: `Bearer ${accessToken}` },
                        }
                    ),
                    axios.get(
                        "https://api.spotify.com/v1/artists?ids=0oSGxhjAwM9xMUzdIWKIjm,1Xyo4u8uXC1ZmMpatF05PJ,2YZyLoL8N0Wzxdu9V7lp8M",
                        {
                            headers: { Authorization: `Bearer ${accessToken}` },
                        }
                    ),
                ]);

                setTopTracks(topTracksResponse.data.items.slice(0, 5));
                setTopArtists(topArtistsResponse.data.artists);
                setIsLoading(false);
            } catch (err) {
                console.error("Error fetching top trends:", err);
                setError("Failed to load Spotify trends. Please try again later.");
                setIsLoading(false);
            }
        };

        fetchTopTrends();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-500 to-blue-600 flex flex-col items-center justify-center p-6">
            <div className="bg-white shadow-2xl rounded-xl p-8 w-full max-w-lg mb-10">
                <h1 className="text-4xl font-bold text-center mb-6 text-green-600">
                    Spotify Trends Explorer
                </h1>
                <a href={SPOTIFY_AUTH_URL} className="w-full block">
                    <button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg transition duration-300">
                        Login with Spotify
                    </button>
                </a>
            </div>

            {isLoading ? (
                <div className="text-white text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-white border-opacity-70"></div>
                    <p className="mt-4">Loading Spotify trends...</p>
                </div>
            ) : error ? (
                <div className="text-white text-center">
                    <p className="text-red-400 font-semibold">{error}</p>
                </div>
            ) : (
                <div className="w-full max-w-4xl">
                    {/* Top Tracks Section */}
                    <div className="mb-10">
                        <h2 className="text-2xl font-semibold text-white mb-4">Top Tracks</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                                        <p className="text-gray-800 font-semibold truncate">
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

                    {/* Top Artists Section */}
                    <div>
                        <h2 className="text-2xl font-semibold text-white mb-4">Top Artists</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                                        <p className="text-gray-800 font-semibold">{artist.name}</p>
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
