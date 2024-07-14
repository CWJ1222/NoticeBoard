import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
    return (
        <header className="bg-gray-800 text-white p-4">
            <div className="container mx-auto flex justify-between">
                <h1 className="text-xl font-bold">My App</h1>
                <nav>
                    <Link to="/" className="mr-4">Home</Link>
                    <Link to="/signin" className="mr-4">Sign In</Link>
                    <Link to="/signup" className="mr-4">Sign Up</Link>
                    <Link to="/board">Board</Link>
                </nav>
            </div>
        </header>
    );
};

export default Header;