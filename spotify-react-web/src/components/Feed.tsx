import React, { useState } from "react";

interface Post {
    id: string;
    songTitle: string;
    lyrics: string;
    notes: string;
}

const Feed = () => {
    const [posts, setPosts] = useState<Post[]>([]);

    const addPost = (songTitle: string, lyrics: string, notes: string) => {
        const newPost: Post = {
            id: Date.now().toString(),
            songTitle,
            lyrics,
            notes,
        };
        setPosts([...posts, newPost]);
    };

    return (
        <div>
            <h1>Lyrics Feed</h1>
            <button onClick={() => addPost("Song Title", "Favorite Lyrics", "Personal Notes")}>
                Add Post
            </button>
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>
                        <h3>{post.songTitle}</h3>
                        <p>{post.lyrics}</p>
                        <p>{post.notes}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Feed;