
// import React, { useState } from "react";
// import axios from "axios";
// import "./UserRegistration.css";
//
// const UserRegistration: React.FC = () => {
//     const [username, setUsername] = useState("");
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//
//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post("http://localhost:4000/api/users", {
//                 username,
//                 email,
//                 password,
//             });
//             console.log(response.data);
//             alert("Registration successful! Please log in.");
//         } catch (error) {
//             console.error("Registration error:", error);
//             alert("Registration failed. Please try again.");
//         }
//     };
//
//     return (
//         <div className="registration-container">
//             <h2>Create a User Profile!</h2>
//             <form onSubmit={handleSubmit}>
//                 <input
//                     type="text"
//                     value={username}
//                     onChange={(e) => setUsername(e.target.value)}
//                     placeholder="Username"
//                     required
//                 />
//                 <input
//                     type="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     placeholder="Email"
//                     required
//                 />
//                 <input
//                     type="password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     placeholder="Password"
//                     required
//                 />
//                 <button type="submit">Register</button>
//             </form>
//         </div>
//     );
// };
//
// export default UserRegistration;


import React, { useState } from "react";
import axios from "axios";
import "./UserRegistration.css";

interface UserProfile {
    username: string;
    email: string;
    password: string;
}

const UserRegistration: React.FC = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [profilePreview, setProfilePreview] = useState<UserProfile | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:4000/api/users", {
                username,
                email,
                password,
            });
            console.log(response.data);
            alert("Registration successful! Please log in.");

            // Display the profile preview
            setProfilePreview({ username, email, password });

            // Clear form inputs
            setUsername("");
            setEmail("");
            setPassword("");
        } catch (error) {
            console.error("Registration error:", error);
            alert("Registration failed. Please try again.");
        }
    };

    return (
        <div className="registration-container">
            <h2>Create a User Profile!</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    required
                />
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <button type="submit">Register</button>
            </form>

            {/* Profile Preview */}
            {profilePreview && (
                <div className="profile-preview">
                    <h3>Profile Preview</h3>
                    <p><strong>Username:</strong> {profilePreview.username}</p>
                    <p><strong>Email:</strong> {profilePreview.email}</p>
                    <p><strong>Password:</strong> {profilePreview.password}</p>
                </div>
            )}
        </div>
    );
};

export default UserRegistration;