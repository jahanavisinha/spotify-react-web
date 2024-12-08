import React, { useState } from "react";
import { registerUser } from "../services/authUtils";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [roles, setRoles] = useState<string[]>([]);
    const navigate = useNavigate();

    const handleRegister = () => {
        registerUser(username, email, password, roles);
        navigate("/login"); // Redirect to login page after successful registration
    };

    const handleRoleChange = (role: string) => {
        setRoles((prevRoles) =>
            prevRoles.includes(role) ? prevRoles.filter((r) => r !== role) : [...prevRoles, role]
        );
    };

    return (
        <div>
            <h1>Register</h1>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <div>
                <label>
                    <input
                        type="checkbox"
                        onChange={() => handleRoleChange("admin")}
                    />
                    Admin
                </label>
                <label>
                    <input
                        type="checkbox"
                        onChange={() => handleRoleChange("user")}
                    />
                    User
                </label>
            </div>
            <button onClick={handleRegister}>Register</button>
        </div>
    );
};

export default RegisterPage;
