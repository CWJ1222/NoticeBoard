import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';

const Board: React.FC = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await api.get('/board');
            setPosts(response.data);
        };

        fetchPosts();
    }, []);

    return (
        <div className="container mx-auto">
            <div className="flex justify-between items-center py-4">
                <h1 className="text-2xl">Board</h1>
                <Link to="/write" className="bg-blue-500 text-white px-4 py-2">Write Post</Link>
            </div>
            <ul>
                {posts.map((post: any) => (
                    <li key={post.id} className="border p-4 mb-4">
                        <h2 className="text-xl">{post.title}</h2>
                        <p>{post.content}</p>
                        <Link to={`/edit/${post.id}`} className="text-blue-500">Edit</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Board;