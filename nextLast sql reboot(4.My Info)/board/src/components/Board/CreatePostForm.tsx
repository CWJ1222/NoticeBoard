import { useState } from 'react';
import useAuth from '../../hooks/useAuth';

const CreatePostForm = () => {
  const isAuthenticated = useAuth();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [coin, setCoin] = useState(); // Default coin value

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/board/createPost', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, content, coin }),
    });

    if (res.ok) {
      window.location.reload(); // Refresh the page after creating a post
    }
  };

  if (!isAuthenticated) return null;

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="border p-2 mb-2 w-full"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
        className="border p-2 mb-2 w-full"
      />
      <input
        type="number"
        value={coin}
        onChange={(e) => setCoin(parseInt(e.target.value))}
        placeholder="Coin"
        className="border p-2 mb-2 w-full"
        min="0"
      />
      <button type="submit" className="bg-blue-500 text-white p-2">Create Post</button>
    </form>
  );
};

export default CreatePostForm;