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
import React, { useEffect, useState } from "react";

interface SpotifyUserData {
    display_name: string;
    email: string;
    id: string;
    images: { url: string }[]; // For profile picture
}

const HomePage: React.FC = () => {
    const [userData, setUserData] = useState<SpotifyUserData | null>(null);

    useEffect(() => {
        const token = localStorage.getItem("spotifyToken");

        const fetchUserData = async () => {
            try {
                const response = await fetch("https://api.spotify.com/v1/me", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (!response.ok) throw new Error("Failed to fetch user data");

                const data: SpotifyUserData = await response.json();
                setUserData(data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        if (token) fetchUserData();
    }, []);

    return (
        <div>
            <h1>Welcome to Spotify App</h1>
            {userData ? (
                <div>
                    <h2>{`Hello, ${userData.display_name}`}</h2>
                    <p>{`Email: ${userData.email}`}</p>
                    {userData.images.length > 0 && (
                        <img src={userData.images[0].url} alt="Profile" style={{ width: "100px" }} />
                    )}
                </div>
            ) : (
                <p>Loading user data...</p>
            )}
        </div>
    );
};

export default HomePage;
