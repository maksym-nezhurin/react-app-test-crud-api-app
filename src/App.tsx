import React, {Fragment, useEffect} from 'react';
import { Link, Route, Routes } from 'react-router-dom'; // Import the Login component
import StorageWrapper from './utils/storageWrapper.ts';
import {useToken} from "./contexts/TokenContext.tsx";

import './App.css';
import {pages} from "./constants/pages.ts";

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
                {
                    Object.keys(pages).map((key) => {
                        const { path, lable, hidden } = pages[key];

                        return hidden ? null : (<Fragment key={path}><Link to={path}>{lable}</Link> | &nbsp;</Fragment>)
                    })
                }
                {
                    !token && <Link to="/login">Login</Link>
                }
            </div>

            <div className={'inner-content'}>
                <Routes>
                    {
                        Object.keys(pages).map((key) => {
                            const { path, component: Component } = pages[key];

                            return <Route key={path} path={path} element={<Component setToken={setToken}/>}/>
                        })
                    }
                </Routes>
            </div>
        </div>
    );
};

export default App;
