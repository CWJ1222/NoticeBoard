import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Board from './pages/Board';
import Write from './pages/Write';
import Edit from './pages/Edit';
import Home from './pages/Home';

const App: React.FC = () => {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/board" element={<Board />} />
                <Route path="/write" element={<Write />} />
                <Route path="/edit/:id" element={<Edit />} />
            </Routes>
        </Router>
    );
};

export default App;