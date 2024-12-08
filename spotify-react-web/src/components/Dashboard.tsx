import React, { useEffect, useState } from "react";
import {getUserTopArtists, setSpotifyAuthToken} from "../services/spotifyApi.ts";
import useSpotifyAuth from "../hooks/useSpotifyAuth.ts";

const Dashboard = () => {
    const token = useSpotifyAuth();
    const [artists, setArtists] = useState<any[]>([]);

    useEffect(() => {
        if (token) {
            setSpotifyAuthToken(token);
            getUserTopArtists().then(setArtists);
        }
    }, [token]);

    return (
        <div>
            <h1>Your Favorite Artists</h1>
            <ul>
                {artists.map((artist) => (
                    <li key={artist.id}>{artist.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;
