import React, { useState } from "react";
import "./FeedPage.css";

interface Post {
    songName: string;
    lyrics: string;
    reason: string;
    memory: string;
    emotion: string;
}

const FeedPage: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [songName, setSongName] = useState("");
    const [lyrics, setLyrics] = useState("");
    const [reason, setReason] = useState("");
    const [memory, setMemory] = useState("");
    const [emotion, setEmotion] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newPost: Post = {
            songName,
            lyrics,
            reason,
            memory,
            emotion,
        };

        setPosts([newPost, ...posts]); // Add new post to the feed
        setSongName("");
        setLyrics("");
        setReason("");
        setMemory("");
        setEmotion("");
    };

    return (
        <div className="feed-page">
            <h1 className="feed-title">Your Feed</h1>
            <form className="feed-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Favorite Song Name"
                    value={songName}
                    onChange={(e) => setSongName(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Favorite Song Lyrics"
                    value={lyrics}
                    onChange={(e) => setLyrics(e.target.value)}
                    required
                ></textarea>
                <textarea
                    placeholder="Why do you like it?"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    required
                ></textarea>
                <textarea
                    placeholder="Memory attached to it"
                    value={memory}
                    onChange={(e) => setMemory(e.target.value)}
                    required
                ></textarea>
                <select
                    value={emotion}
                    onChange={(e) => setEmotion(e.target.value)}
                    required
                >
                    <option value="" disabled>
                        Emotion Attached (Choose one)
                    </option>
                    <option value="😊">😊 Happy</option>
                    <option value="😢">😢 Sad</option>
                    <option value="😎">😎 Chill</option>
                    <option value="🔥">🔥 Pumped</option>
                    <option value="❤️">❤️ Love</option>
                </select>
                <button type="submit">Post to Feed</button>
            </form>
            <div className="feed-posts">
                {posts.map((post, index) => (
                    <div key={index} className="feed-post">
                        <h3>{post.songName}</h3>
                        <p>
                            <strong>Lyrics:</strong> {post.lyrics}
                        </p>
                        <p>
                            <strong>Why:</strong> {post.reason}
                        </p>
                        <p>
                            <strong>Memory:</strong> {post.memory}
                        </p>
                        <p>
                            <strong>Emotion:</strong> {post.emotion}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FeedPage;
