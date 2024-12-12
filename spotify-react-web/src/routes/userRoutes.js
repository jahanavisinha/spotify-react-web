import * as dao from "./dao.js";

export default function UserRoutes(app) {
    const createUser = async (req, res) => {
        try {
            const user = await dao.createUser(req.body);
            res.status(201).json(user); // Return success response
        } catch (error) {
            console.error("Error creating user:", error);
            if (error.code === 11000) {
                res.status(400).json({ error: "Username or email already exists" });
            } else {
                res.status(500).json({ error: "Failed to create user" });
            }
        }
    };

    app.post("/api/users", createUser);
}
