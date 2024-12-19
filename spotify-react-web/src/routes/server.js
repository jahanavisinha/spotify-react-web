import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const app = express();
app.use(express.json());

const users = [
    { username: "johndoe", email: "john@example.com", password: bcrypt.hashSync("123", 10) },
    { username: "janedoe", email: "jane@example.com", password: bcrypt.hashSync("1234", 10) },
];

app.post("/api/auth/login", (req, res) => {
    const { email, password } = req.body;
    const user = users.find((user) => user.email === email);

    if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ message: "Invalid email or password." });
    }

    const token = jwt.sign({ email: user.email, username: user.username }, "secretKey", {
        expiresIn: "1h",
    });
    res.json({ token, message: "Login successful" });
});

app.listen(5000, () => console.log("Server running on http://localhost:5173"));
