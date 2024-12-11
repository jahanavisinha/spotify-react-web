import React, { useEffect, useState } from "react";
import { getUserTopArtists, setSpotifyAuthToken } from "../services/spotifyApi";
import useSpotifyAuth from "../hooks/useSpotifyAuth";
import "./Dashboard.css"; // Import the CSS file

interface Artist {
    id: string;
    name: string;
    image?: string;
    followers?: number;
}

const Dashboard: React.FC = () => {
    const token = useSpotifyAuth();
    const [artists, setArtists] = useState<Artist[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchArtists = async () => {
            try {
                if (token) {
                    setSpotifyAuthToken(token);
                    const topArtists = await getUserTopArtists();
                    setArtists(topArtists);
                }
            } catch (err) {
                setError("Failed to fetch top artists. Please try again.");
                console.error(err);
            }
        };

        fetchArtists();
    }, [token]);

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>Your Favorite Artists</h1>
            </header>
            {error && <p className="error-message">{error}</p>}
            {!artists.length && !error && <p className="loading-message">Loading your top artists...</p>}
            <div className="artist-grid">
                {artists.map((artist) => (
                    <div key={artist.id} className="artist-card">
                        <img
                            src={artist.image || "https://via.placeholder.com/150"}
                            alt={artist.name}
                            className="artist-image"
                        />
                        <h3 className="artist-name">{artist.name}</h3>
                        {artist.followers && (
                            <p className="artist-followers">
                                {artist.followers.toLocaleString()} Followers
                            </p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
