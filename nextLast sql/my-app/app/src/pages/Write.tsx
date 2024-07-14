import React, { useState } from 'react';
import api from '../services/api';

const Write: React.FC = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post('/board/write', { title, content, userId: 1 }); // Assuming userId is 1 for now
            alert('Post created');
        } catch (error) {
            alert('Post creation failed');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <form onSubmit={handleSubmit} className="w-1/3 p-4">
                <div className="mb-4">
                    <label className="block mb-2">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-2 border"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Content</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full p-2 border"
                    />
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white p-2">Submit</button>
            </form>
        </div>
    );
};

export default Write;