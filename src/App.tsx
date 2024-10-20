import React, { useEffect } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import HomePage from './pages/Home';
import ArticlePage from './pages/Article';
import LoginPage from "./pages/LoginPage.tsx";  // Import the Login component
import StorageWrapper from './utils/storageWrapper.ts';
import {useToken} from "./contexts/TokenContext.tsx";

import './App.css';

const storage = new StorageWrapper();

const App: React.FC = () => {
    const { setToken, token } = useToken();

    // Save the token to localStorage or sessionStorage to persist it
    useEffect(() => {
        if (token) {
            storage.setItem('authToken', token);
        }
    }, [token]);

    return (
        <div className={"main"}>
            <div>
                <Link to="/">Home</Link> | &nbsp;
                {
                    !token && <Link to="/login">Login</Link>
                }
            </div>

            <div className={'inner-content'}>
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/login" element={<LoginPage setToken={setToken}/>}/>
                    <Route path="/articles/:id" element={<ArticlePage/>}/>
                </Routes>
            </div>
        </div>
    );
};

export default App;
