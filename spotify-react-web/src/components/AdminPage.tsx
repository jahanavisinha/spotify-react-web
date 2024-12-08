import React, { useState } from "react";
import { hasRole } from "../services/authUtils";
import { Navigate } from "react-router-dom";

const AdminPage = () => {
    const [users, setUsers] = useState<any[]>([
        { username: "john_doe", roles: ["user"] },
        { username: "admin_user", roles: ["admin", "user"] },
        // more users...
    ]);

    if (!hasRole("admin")) {
        return <Navigate to="/login" />;
    }

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <h2>User Management</h2>
            <ul>
                {users.map((user, index) => (
                    <li key={index}>
                        <span>{user.username}</span> - Roles: {user.roles.join(", ")}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminPage;