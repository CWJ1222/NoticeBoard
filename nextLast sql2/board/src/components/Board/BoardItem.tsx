interface BoardItemProps {
  id: number;
  title: string;
  content: string;
  onEdit: () => void;
  onDelete: () => void;
}

const BoardItem: React.FC<BoardItemProps> = ({ id, title, content, onEdit, onDelete }) => (
  <div className="bg-white p-4 rounded shadow-md">
    <h3 className="text-xl font-bold">{title}</h3>
    <p className="mb-4">{content}</p>
    <button onClick={onEdit} className="mr-2 p-2 bg-blue-500 text-white rounded">Edit</button>
    <button onClick={onDelete} className="p-2 bg-red-500 text-white rounded">Delete</button>
  </div>
);

export default BoardItem;