import { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import BoardItem from '../../components/Board/BoardItem';
import Modal from '../../components/UI/Modal';
import Input from '../../components/UI/Input';
import Button from '../../components/UI/Button';

interface Post {
  id: number;
  title: string;
  content: string;
  userId: number;
}

const Board: React.FC = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string>('');
  const [newPost, setNewPost] = useState({ title: '', content: '' });
  const [editPost, setEditPost] = useState<Post | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/board');
        if (!res.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data: Post[] = await res.json();
        setPosts(data);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchPosts();
  }, []);

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/board/createPost', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: user.id, ...newPost }),
      });

      if (!res.ok) {
        throw new Error('Failed to create post');
      }

      const data: Post = await res.json();
      setPosts([...posts, data]);
      setNewPost({ title: '', content: '' });
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleEditPost = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/board/updatePost', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editPost),
      });

      if (!res.ok) {
        throw new Error('Failed to update post');
      }

      const data: Post = await res.json();
      setPosts(posts.map(post => (post.id === data.id ? data : post)));
      setEditPost(null);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleDeletePost = async (postId: number) => {
    try {
      const res = await fetch('/api/board/deletePost', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ postId }),
      });

      if (!res.ok) {
        throw new Error('Failed to delete post');
      }

      setPosts(posts.filter(post => post.id !== postId));
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Board</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}

        {user && (
          <form onSubmit={handleCreatePost} className="mb-6">
            <h2 className="text-2xl font-bold mb-4">Create New Post</h2>
            <div className="mb-4">
              <Input
                type="text"
                id="title"
                value={newPost.title}
                onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                placeholder="Title"
                required
              />
            </div>
            <div className="mb-4">
              <Input
                type="text"
                id="content"
                value={newPost.content}
                onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                placeholder="Content"
                required
              />
            </div>
            <Button type="submit">Create Post</Button>
          </form>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map(post => (
            <BoardItem
              key={post.id}
              id={post.id}
              title={post.title}
              content={post.content}
              onEdit={() => setEditPost(post)}
              onDelete={() => handleDeletePost(post.id)}
            />
          ))}
        </div>

        {editPost && (
          <Modal isOpen={Boolean(editPost)} onClose={() => setEditPost(null)}>
            <form onSubmit={handleEditPost}>
              <h2 className="text-2xl font-bold mb-4">Edit Post</h2>
              <div className="mb-4">
                <Input
                  type="text"
                  id="editTitle"
                  value={editPost.title}
                  onChange={(e) => setEditPost({ ...editPost, title: e.target.value })}
                  placeholder="Title"
                  required
                />
              </div>
              <div className="mb-4">
                <Input
                  type="text"
                  id="editContent"
                  value={editPost.content}
                  onChange={(e) => setEditPost({ ...editPost, content: e.target.value })}
                  placeholder="Content"
                  required
                />
              </div>
              <Button type="submit">Update Post</Button>
            </form>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default Board;