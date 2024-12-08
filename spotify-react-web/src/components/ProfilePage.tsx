import React from "react";
import { isLoggedIn } from "../services/authUtils";

const ProfilePage = () => {
    if (!isLoggedIn()) {
        return <p>Please login to view your profile.</p>;
    }

    return (
        <div>
            <h1>Your Profile</h1>
            {/* Display user profile content here */}
        </div>
    );
};

export default ProfilePage;