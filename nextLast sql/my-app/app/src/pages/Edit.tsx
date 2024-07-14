import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';

const Edit: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        const fetchPost = async () => {
            const response = await api.get(`/board/${id}`);
            setTitle(response.data.title);
            setContent(response.data.content);
        };

        fetchPost();
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.put(`/board/edit/${id}`, { title, content });
            alert('Post updated');
        } catch (error) {
            alert('Post update failed');
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
                <button type="submit" className="w-full bg-blue-500 text-white p-2">Update</button>
            </form>
        </div>
    );
};

export default Edit;