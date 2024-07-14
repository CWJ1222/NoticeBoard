interface InputProps {
  type: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string; // Make placeholder optional
  required?: boolean;
}

const Input: React.FC<InputProps> = ({ type, id, value, onChange, placeholder, required }) => (
  <input
    type={type}
    id={id}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    required={required}
    className="w-full p-2 border border-gray-300 rounded"
  />
);

export default Input;