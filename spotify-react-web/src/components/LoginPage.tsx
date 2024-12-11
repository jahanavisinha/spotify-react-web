import React, { useState, useEffect } from "react";
import axios from "axios";
import "./LoginPage.css";

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
    const SPOTIFY_SIGNUP_URL = "https://www.spotify.com/signup/";

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
        <div className="login-page">
            <div className="login-container">
                <h1 className="title">Spotify Trends Explorer</h1>
                <a href={SPOTIFY_AUTH_URL} className="auth-button">
                    Login with Spotify
                </a>
                <p className="signup-text">
                    Don’t have a Spotify account?{" "}
                    <a href={SPOTIFY_SIGNUP_URL} className="signup-button">
                        Make one here
                    </a>
                </p>
            </div>

            {isLoading ? (
                <div className="loading">
                    <div className="spinner"></div>
                    <p>Loading Spotify trends...</p>
                </div>
            ) : error ? (
                <div className="error">
                    <p>{error}</p>
                </div>
            ) : (
                <div className="trends-container">
                    <section className="trends-section">
                        <h2 className="section-title">Top Tracks</h2>
                        <div className="trends-grid">
                            {topTracks.map((track) => (
                                <div key={track.track.id} className="trend-item">
                                    <img
                                        src={track.track.album.images[0]?.url || "placeholder.jpg"}
                                        alt={track.track.name}
                                        className="trend-image"
                                    />
                                    <div>
                                        <p className="trend-title">{track.track.name}</p>
                                        <p className="trend-subtitle">
                                            {track.track.artists[0]?.name || "Unknown Artist"}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="trends-section">
                        <h2 className="section-title">Top Artists</h2>
                        <div className="trends-grid">
                            {topArtists.map((artist) => (
                                <div key={artist.id} className="trend-item">
                                    <img
                                        src={artist.images[0]?.url || "placeholder.jpg"}
                                        alt={artist.name}
                                        className="trend-image"
                                    />
                                    <div>
                                        <p className="trend-title">{artist.name}</p>
                                        <p className="trend-subtitle">
                                            {artist.followers.total.toLocaleString()} Followers
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            )}
        </div>
    );
};

export default LoginPage;
