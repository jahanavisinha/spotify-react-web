// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//     fetchTrendingArtists,
//     fetchPopularPlaylists,
//     fetchUserData,
// } from "../services/spotifyApi";
// import "./HomePage.css"; // Import the CSS file
//
// const HomePage: React.FC<{ isAuthenticated: boolean; accessToken: string }> = ({
//                                                                                    isAuthenticated,
//                                                                                    accessToken,
//                                                                                }) => {
//     const [trendingArtists, setTrendingArtists] = useState([]);
//     const [popularPlaylists, setPopularPlaylists] = useState([]);
//     const [userContent, setUserContent] = useState<any>(null);
//     const [searchTerm, setSearchTerm] = useState("");
//     const [loading, setLoading] = useState(true);
//     const navigate = useNavigate();
//
//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 if (isAuthenticated) {
//                     const data = await fetchUserData(accessToken);
//                     setUserContent(data);
//                 } else {
//                     const artists = await fetchTrendingArtists();
//                     setTrendingArtists(artists);
//                     const playlists = await fetchPopularPlaylists();
//                     setPopularPlaylists(playlists);
//                 }
//             } catch (error) {
//                 console.error("Error fetching data:", error);
//             } finally {
//                 setLoading(false);
//             }
//         };
//
//         fetchData();
//     }, [isAuthenticated, accessToken]);
//
//     const handleSearch = (e: React.FormEvent) => {
//         e.preventDefault();
//         navigate(`/search?query=${searchTerm}`);
//     };
//
//     return (
//         <div className="homepage">
//             <header className="homepage-header">
//                 <h1 className="homepage-title">MusicMatch</h1>
//                 <p className="homepage-subtitle">
//                     {isAuthenticated
//                         ? "Discover music based on your recent activity."
//                         : "Explore trending music and playlists."}
//                 </p>
//             </header>
//
//             <form onSubmit={handleSearch} className="search-bar-container">
//                 <input
//                     type="text"
//                     placeholder="Search for users, artists, or playlists"
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="search-input"
//                 />
//                 <button type="submit" className="search-button">
//                     Search
//                 </button>
//             </form>
//
//             {loading ? (
//                 <div className="loading">
//                     <p>Loading content...</p>
//                 </div>
//             ) : (
//                 <div className="content-container">
//                     {!isAuthenticated ? (
//                         <>
//                             <section>
//                                 <h2 className="section-title">Trending Artists</h2>
//                                 <div className="grid-container">
//                                     {trendingArtists.map((artist) => (
//                                         <div
//                                             key={artist.id}
//                                             className="card"
//                                         >
//                                             <h3 className="card-title">{artist.name}</h3>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </section>
//
//                             <section>
//                                 <h2 className="section-title">Popular Playlists</h2>
//                                 <div className="grid-container">
//                                     {popularPlaylists.map((playlist) => (
//                                         <div
//                                             key={playlist.id}
//                                             className="card"
//                                         >
//                                             <h3 className="card-title">{playlist.name}</h3>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </section>
//                         </>
//                     ) : (
//                         <>
//                             <section>
//                                 <h2 className="section-title">Your Personalized Content</h2>
//                                 <div className="grid-container">
//                                     {userContent?.recentTracks?.map((track) => (
//                                         <div
//                                             key={track.id}
//                                             className="card"
//                                         >
//                                             <h3 className="card-title">{track.name}</h3>
//                                             <p className="card-subtitle">{track.artist}</p>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </section>
//
//                             <section>
//                                 <h2 className="section-title">Your Top Artists</h2>
//                                 <div className="grid-container">
//                                     {userContent?.topArtists?.map((artist) => (
//                                         <div
//                                             key={artist.id}
//                                             className="card"
//                                         >
//                                             <h3 className="card-title">{artist.name}</h3>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </section>
//                         </>
//                     )}
//                 </div>
//             )}
//         </div>
//     );
// };
//
// export default HomePage;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    fetchTrendingArtists,
    fetchPopularPlaylists,
    fetchUserData,
} from "../services/spotifyApi";
import "./HomePage.css";

const popularArtists = [
    { id: 1, name: "Taylor Swift", image: "https://19thnews.org/wp-content/uploads/2024/09/taylor-swift-kamala-harris-endorsement.jpg?w=150&h=150&crop=1" },
    { id: 2, name: "Kendrick Lamar", image: "https://press.tiffany.com/wp-content/uploads/Kendrick-Lamar-at-Glastonbury_Anna-Barclay-150x150.jpg" },
    { id: 3, name: "Sabrina Carpenter", image: "https://www.rollingstone.com/wp-content/uploads/2024/06/Traff_Sabrina-Carpenter_Final-02.jpg?w=150&h=150&crop=1" },
    { id: 4, name: "Billie Eilish", image: "https://www.looktothestars.org/photo/12763-billie-eilish/teaser-1559245445.jpg" },
    { id: 5, name: "Juice WRLD", image: "https://www.billboard.com/wp-content/uploads/media/juice-wrld-2018-vmas-b-billboard-1548.jpg?w=150&h=150&crop=1" },
    { id: 6, name: "Morgan Wallen", image: "https://www.rollingstone.com/wp-content/uploads/2023/05/morgan-wallen-timeline.jpg?w=150&h=150&crop=1" },
    { id: 7, name: "Ariana Grande", image: "https://www.billboard.com/wp-content/uploads/2022/08/Ariana-Grande-the-voice-2021-billboard-1548.jpg?w=150&h=150&crop=1" },
    { id: 8, name: "Tyler, The Creator", image: "https://www.billboard.com/wp-content/uploads/media/tyler-the-creator-i-think-2019-billboard-1548.jpg?w=150&h=150&crop=1" },
    { id: 9, name: "Chappell Roan", image: "https://www.billboard.com/wp-content/uploads/2022/12/Chappell-Roan-2022-cr-Ryan-Clemons-billboard-1548.jpg?w=150&h=150&crop=1" },
    { id: 10, name: "SZA", image: "https://dailypost.ng/wp-content/uploads/2024/08/SZA-1-150x150.jpg" },
];

const topSongs = [
    { id: 1, name: "All I Want For Christmas Is You", artist: "Mariah Carey", image: "https://preview.redd.it/all-i-want-for-christmas-is-you-cover-art-edited-by-me-v0-9km6zt850ttd1.jpg?width=640&crop=smart&auto=webp&s=dcacf253d2226dbaafd9d71c542275f899f0d863" },
    { id: 2, name: "Rockin' Around The Christmas Tree", artist: "Brenda Lee", image: "https://i.scdn.co/image/ab67616d0000b2737845f74d6db14b400fa61cd3" },
    { id: 3, name: "Last Christmas", artist: "Wham!", image: "https://ladycultblog.com/wp-content/uploads/2020/12/whamjpg.jpg" },
    { id: 4, name: "TV Off", artist: "Kendrick Lamar", image: "https://i1.sndcdn.com/artworks-y6WaHzlvp7PbwkLT-JlZicw-t500x500.png" },
    { id: 5, name: "Jingle Bell Rock", artist: "Bobby Helms", image: "https://m.media-amazon.com/images/I/81TYjkfc9uL._UF1000,1000_QL80_DpWeblab_.jpg" },
];

interface HomePageProps {
    isAuthenticated: boolean;
    accessToken: string;
}

const HomePage: React.FC<HomePageProps> = ({ isAuthenticated, accessToken }) => {
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
                    const data = await fetchUserData();
                    console.log(data.topArtists)
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
                        : "A place to dive deep into your music taste and post your favorites on others' feed!"}
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
                    <section>
                        <h2 className="section-title">Popular Artists of the Week</h2>
                        <div className="grid-container">
                            {popularArtists.map((artist) => (
                                <div key={artist.id} className="card">
                                    <img src={artist.image} alt={artist.name} className="card-image" />
                                    <h3 className="card-title">{artist.name}</h3>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="section-title">Top Songs of the Week</h2>
                        <div className="grid-container">
                            {topSongs.map((song) => (
                                <div key={song.id} className="card">
                                    <img src={song.image} alt={song.name} className="card-image" />
                                    <h3 className="card-title">{song.name}</h3>
                                    <p className="card-subtitle">by {song.artist}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {isAuthenticated ? (
                        <>
                            <section>
                                <h2 className="section-title">Your Personalized Content</h2>
                                <div className="grid-container">
                                    {userContent?.recentTracks?.map((track) => (
                                        <div key={track.id} className="card">
                                            <h3 className="card-title">{track.name}</h3>
                                            <p className="card-subtitle">{track.artist}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <section>
                                <h2 className="section-title">Your Personalized Content</h2>
                                <h2 className="section-title">Popular Artists of the Week</h2>
                                <div className="grid-container">
                                    {userContent?.topArtists?.map((artist) => (
                                        <div key={artist.id} className="card">
                                            <img src={artist.image} alt={artist.name}
                                                 className="card-image"/>
                                            <h3 className="card-title">{artist.name}</h3>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </>
                    ) : (
                        <>
                            <section>
                                <h2 className="section-title">Trending Artists (Personalized- Login
                                    to View)</h2>
                                <div className="grid-container">
                                    {trendingArtists.map((artist) => (
                                        <div key={artist.id} className="card">
                                            <h3 className="card-title">{artist.name}</h3>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <section>
                                <h2 className="section-title">Your Top Playlists (Personalized-
                                    Login to View)</h2>
                                <div className="grid-container">
                                    {popularPlaylists.map((playlist) => (
                                        <div key={playlist.id} className="card">
                                            <h3 className="card-title">{playlist.name}</h3>
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
