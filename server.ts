import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from "./spotify-react-web/src/routes/authRoutes";
import userRoutes from "./spotify-react-web/src/routes/userRoutes";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Update your MongoDB connection options
mongoose
    .connect('mongodb://localhost:27017/spotify-database')
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
