// import React, { useState } from "react";
// import "./FeedPage.css";
//
// interface Post {
//     songName: string;
//     lyrics: string;
//     reason: string;
//     memory: string;
//     emotion: string;
//     upvotes: number;
//     downvotes: number;
//     createdAt: string; // ISO string for simplicity
// }
//
// const FeedPage: React.FC = () => {
//     const [posts, setPosts] = useState<Post[]>([]);
//     const [songName, setSongName] = useState("");
//     const [lyrics, setLyrics] = useState("");
//     const [reason, setReason] = useState("");
//     const [memory, setMemory] = useState("");
//     const [emotion, setEmotion] = useState("");
//
//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault();
//
//         const newPost: Post = {
//             songName,
//             lyrics,
//             reason,
//             memory,
//             emotion,
//             upvotes: 0,
//             downvotes: 0,
//             createdAt: new Date().toISOString(),
//         };
//
//         setPosts([newPost, ...posts]); // Add new post to the feed
//         setSongName("");
//         setLyrics("");
//         setReason("");
//         setMemory("");
//         setEmotion("");
//     };
//
//     const handleUpvote = (index: number) => {
//         const updatedPosts = [...posts];
//         updatedPosts[index].upvotes += 1;
//         setPosts(updatedPosts);
//     };
//
//     const handleDownvote = (index: number) => {
//         const updatedPosts = [...posts];
//         updatedPosts[index].downvotes += 1;
//         setPosts(updatedPosts);
//     };
//
//     return (
//         <div className="feed-page">
//             <h1 className="feed-title">Your Feed</h1>
//             <form className="feed-form" onSubmit={handleSubmit}>
//                 <input
//                     type="text"
//                     placeholder="Favorite Song Name"
//                     value={songName}
//                     onChange={(e) => setSongName(e.target.value)}
//                     required
//                 />
//                 <textarea
//                     placeholder="Favorite Song Lyrics"
//                     value={lyrics}
//                     onChange={(e) => setLyrics(e.target.value)}
//                     required
//                 ></textarea>
//                 <textarea
//                     placeholder="Why do you like it?"
//                     value={reason}
//                     onChange={(e) => setReason(e.target.value)}
//                     required
//                 ></textarea>
//                 <textarea
//                     placeholder="Memory attached to it"
//                     value={memory}
//                     onChange={(e) => setMemory(e.target.value)}
//                     required
//                 ></textarea>
//                 <select
//                     value={emotion}
//                     onChange={(e) => setEmotion(e.target.value)}
//                     required
//                 >
//                     <option value="" disabled>
//                         Emotion Attached (Choose one)
//                     </option>
//                     <option value="😊">😊 Happy</option>
//                     <option value="😢">😢 Sad</option>
//                     <option value="😎">😎 Chill</option>
//                     <option value="🔥">🔥 Pumped</option>
//                     <option value="❤️">❤️ Love</option>
//                 </select>
//                 <button type="submit">Post to Feed</button>
//             </form>
//             <div className="feed-posts">
//                 {posts.map((post, index) => (
//                     <div key={index} className="feed-post">
//                         <h3>{post.songName}</h3>
//                         <p>
//                             <strong>Lyrics:</strong> {post.lyrics}
//                         </p>
//                         <p>
//                             <strong>Why:</strong> {post.reason}
//                         </p>
//                         <p>
//                             <strong>Memory:</strong> {post.memory}
//                         </p>
//                         <p>
//                             <strong>Emotion:</strong> {post.emotion}
//                         </p>
//                         <p>
//                             <strong>Posted On:</strong> {new Date(post.createdAt).toLocaleString()}
//                         </p>
//                         <div className="post-actions">
//                             <button
//                                 className="upvote-button"
//                                 onClick={() => handleUpvote(index)}
//                             >
//                                 👍 {post.upvotes}
//                             </button>
//                             <button
//                                 className="downvote-button"
//                                 onClick={() => handleDownvote(index)}
//                             >
//                                 👎 {post.downvotes}
//                             </button>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };
//
// export default FeedPage;


import React, { useState } from "react";
import "./FeedPage.css";

interface Comment {
    text: string;
    createdAt: string; // ISO string for simplicity
}

interface Post {
    songName: string;
    lyrics: string;
    reason: string;
    memory: string;
    emotion: string;
    upvotes: number;
    downvotes: number;
    createdAt: string; // ISO string for simplicity
    comments: Comment[];
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
            upvotes: 0,
            downvotes: 0,
            createdAt: new Date().toISOString(),
            comments: [],
        };

        setPosts([newPost, ...posts]); // Add new post to the feed
        setSongName("");
        setLyrics("");
        setReason("");
        setMemory("");
        setEmotion("");
    };

    const handleUpvote = (index: number) => {
        const updatedPosts = [...posts];
        updatedPosts[index].upvotes += 1;
        setPosts(updatedPosts);
    };

    const handleDownvote = (index: number) => {
        const updatedPosts = [...posts];
        updatedPosts[index].downvotes += 1;
        setPosts(updatedPosts);
    };

    const handleAddComment = (index: number, commentText: string) => {
        const updatedPosts = [...posts];
        const newComment: Comment = {
            text: commentText,
            createdAt: new Date().toISOString(),
        };
        updatedPosts[index].comments.push(newComment);
        setPosts(updatedPosts);
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
                        <p>
                            <strong>Posted On:</strong> {new Date(post.createdAt).toLocaleString()}
                        </p>
                        <div className="post-actions">
                            <button
                                className="upvote-button"
                                onClick={() => handleUpvote(index)}
                            >
                                👍 {post.upvotes}
                            </button>
                            <button
                                className="downvote-button"
                                onClick={() => handleDownvote(index)}
                            >
                                👎 {post.downvotes}
                            </button>
                        </div>
                        <div className="comments-section">
                            <h4>Comments</h4>
                            <ul>
                                {post.comments.map((comment, commentIndex) => (
                                    <li key={commentIndex}>
                                        <p>
                                            {comment.text} <br />
                                            <small>{new Date(comment.createdAt).toLocaleString()}</small>
                                        </p>
                                    </li>
                                ))}
                            </ul>
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    const form = e.target as HTMLFormElement;
                                    const input = form.elements.namedItem("comment") as HTMLInputElement;
                                    handleAddComment(index, input.value);
                                    input.value = "";
                                }}
                            >
                                <input
                                    type="text"
                                    name="comment"
                                    placeholder="Add a comment"
                                    required
                                />
                                <button type="submit">Comment</button>
                            </form>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FeedPage;