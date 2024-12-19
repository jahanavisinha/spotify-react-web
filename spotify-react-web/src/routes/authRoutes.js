// import express from 'express';
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
// import User from '../models/User';
//
// const router = express.Router();
//
// router.post('/register', async (req, res) => {
//     try {
//         const { username, email, password } = req.body;
//         const hashedPassword = await bcrypt.hash(password, 10);
//         const user = new User({ username, email, password: hashedPassword });
//         await user.save();
//         res.status(201).json({ message: 'User registered successfully' });
//     } catch (error) {
//         res.status(500).json({ error: 'Registration failed' });
//     }
// });
//
// router.post('/login', async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(400).json({ error: 'User not found' });
//         }
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(400).json({ error: 'Invalid credentials' });
//         }
//         const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
//         res.json({ token });
//     } catch (error) {
//         res.status(500).json({ error: 'Login failed' });
//     }
// });
//
// export default router;
import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const router = express.Router();

// Example in-memory user database
const users = [
    { username: "johndoe", email: "john@example.com", password: bcrypt.hashSync("123", 10) },
    { username: "janedoe", email: "jane@example.com", password: bcrypt.hashSync("1234", 10) },
];

// Login route
router.post("/login", (req, res) => {
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

export default router;
