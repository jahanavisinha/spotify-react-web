// import React, { useEffect, useState } from "react";
// import {getUserTopArtists, setSpotifyAuthToken} from "../services/spotifyApi.ts";
// import useSpotifyAuth from "../hooks/useSpotifyAuth.ts";
//
// const Dashboard = () => {
//     const token = useSpotifyAuth();
//     const [artists, setArtists] = useState<any[]>([]);
//
//     useEffect(() => {
//         if (token) {
//             setSpotifyAuthToken(token);
//             getUserTopArtists().then(setArtists);
//         }
//     }, [token]);
//
//     return (
//         <div>
//             <h1>Your Favorite Artists</h1>
//             <ul>
//                 {artists.map((artist) => (
//                     <li key={artist.id}>{artist.name}</li>
//                 ))}
//             </ul>
//         </div>
//     );
// };
//
// export default Dashboard;

import React, { useEffect, useState } from "react";
import { getUserTopArtists, setSpotifyAuthToken } from "../services/spotifyApi";
import useSpotifyAuth from "../hooks/useSpotifyAuth";

interface Artist {
    id: string;
    name: string;
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
        <div>
            <h1>Your Favorite Artists</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {!artists.length && !error && <p>Loading your top artists...</p>}
            <ul>
                {artists.map((artist) => (
                    <li key={artist.id}>{artist.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;
