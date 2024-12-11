import React, { useState, useEffect } from "react";
import { isLoggedIn } from "../services/authUtils";
import { getUserProfile, getUserTopArtists, getUserPlaylists } from "../services/spotifyApi";

const ProfilePage = () => {
    const [userData, setUserData] = useState(null);
    const [topArtists, setTopArtists] = useState([]);
    const [playlists, setPlaylists] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (isLoggedIn()) {
            const fetchData = async () => {
                try {
                    const profileData = await getUserProfile();
                    const artists = await getUserTopArtists();
                    const userPlaylists = await getUserPlaylists();

                    setUserData(profileData);
                    setTopArtists(artists);
                    setPlaylists(userPlaylists);
                    setIsLoading(false);
                } catch (error) {
                    console.error("Error fetching profile data:", error);
                    setIsLoading(false);
                }
            };

            fetchData();
        }
    }, []);

    if (!isLoggedIn()) {
        return <p>Please login to view your profile.</p>;
    }

    if (isLoading) {
        return <p>Loading profile...</p>;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            {userData && (
                <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                    <div className="flex items-center space-x-4">
                        <img
                            src={userData.images[0]?.url || "placeholder.jpg"}
                            alt="Profile"
                            className="w-20 h-20 rounded-full"
                        />
                        <div>
                            <h2 className="text-xl font-bold">{userData.display_name}</h2>
                            <p className="text-gray-600">Followers: {userData.followers.total}</p>
                        </div>
                    </div>
                </div>
            )}

            <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold mb-4">Top Artists</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {topArtists.map((artist) => (
                        <li key={artist.id} className="flex items-center space-x-4">
                            <img
                                src={artist.images[0]?.url || "placeholder.jpg"}
                                alt={artist.name}
                                className="w-16 h-16 rounded-md"
                            />
                            <div>
                                <p className="font-bold">{artist.name}</p>
                                <p className="text-gray-600">Followers: {artist.followers.total}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold mb-4">Playlists</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {playlists.map((playlist) => (
                        <li key={playlist.id} className="flex items-center space-x-4">
                            <img
                                src={playlist.images[0]?.url || "placeholder.jpg"}
                                alt={playlist.name}
                                className="w-16 h-16 rounded-md"
                            />
                            <div>
                                <p className="font-bold">{playlist.name}</p>
                                <p className="text-gray-600">Tracks: {playlist.tracks.total}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="bg-white shadow-md rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Personal Information & Settings</h3>
                <p>Edit your profile and manage your settings here (feature coming soon).</p>
            </div>
        </div>
    );
};

export default ProfilePage;