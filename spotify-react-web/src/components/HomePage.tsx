import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    fetchTrendingArtists,
    fetchPopularPlaylists,
    fetchUserData,
} from "../services/spotifyApi";
import "./HomePage.css"; // Import the CSS file

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
        <div className="homepage">
            <header className="homepage-header">
                <h1 className="homepage-title">MusicMatch</h1>
                <p className="homepage-subtitle">
                    {isAuthenticated
                        ? "Discover music based on your recent activity."
                        : "Explore trending music and playlists."}
                </p>
            </header>

            <form onSubmit={handleSearch} className="search-bar-container">
                <input
                    type="text"
                    placeholder="Search for users, artists, or playlists"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
                <button type="submit" className="search-button">
                    Search
                </button>
            </form>

            {loading ? (
                <div className="loading">
                    <p>Loading content...</p>
                </div>
            ) : (
                <div className="content-container">
                    {!isAuthenticated ? (
                        <>
                            <section>
                                <h2 className="section-title">Trending Artists</h2>
                                <div className="grid-container">
                                    {trendingArtists.map((artist) => (
                                        <div
                                            key={artist.id}
                                            className="card"
                                        >
                                            <h3 className="card-title">{artist.name}</h3>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <section>
                                <h2 className="section-title">Popular Playlists</h2>
                                <div className="grid-container">
                                    {popularPlaylists.map((playlist) => (
                                        <div
                                            key={playlist.id}
                                            className="card"
                                        >
                                            <h3 className="card-title">{playlist.name}</h3>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </>
                    ) : (
                        <>
                            <section>
                                <h2 className="section-title">Your Personalized Content</h2>
                                <div className="grid-container">
                                    {userContent?.recentTracks?.map((track) => (
                                        <div
                                            key={track.id}
                                            className="card"
                                        >
                                            <h3 className="card-title">{track.name}</h3>
                                            <p className="card-subtitle">{track.artist}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <section>
                                <h2 className="section-title">Your Top Artists</h2>
                                <div className="grid-container">
                                    {userContent?.topArtists?.map((artist) => (
                                        <div
                                            key={artist.id}
                                            className="card"
                                        >
                                            <h3 className="card-title">{artist.name}</h3>
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
