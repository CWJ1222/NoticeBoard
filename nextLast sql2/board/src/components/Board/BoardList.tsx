import React from 'react';
import BoardItem from './BoardItem';

interface BoardListProps {
  posts: { id: number; title: string; content: string }[];
}

const BoardList: React.FC<BoardListProps> = ({ posts }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <BoardItem key={post.id} id={post.id} title={post.title} content={post.content} />
      ))}
    </div>
  );
};

export default BoardList;