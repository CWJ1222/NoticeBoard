// Button.tsx
import React from 'react';

interface ButtonProps {
  type: 'button' | 'submit' | 'reset';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ type, children }) => (
  <button type={type} className="bg-blue-500 text-white p-2 rounded">
    {children}
  </button>
);

export default Button;