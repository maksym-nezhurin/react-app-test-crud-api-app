import React, { useEffect, useState, Fragment } from 'react';
import { Route, Routes } from 'react-router-dom';
import StorageWrapper from './utils/storageWrapper.ts';
import './App.css';
import { pages } from "./constants/pages.tsx";
import ProtectedRoute from "./components/ProtectedRoute";
import {Header} from "./components/Header";
import authStore from "./stores/authStore.ts";

const storage = new StorageWrapper();

const App: React.FC = () => {
    const { token } = authStore;
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        if (token) {
            storage.setItem('authToken', token);
        }
    }, [token]);

    const toggleMenu = (flag: boolean) => setIsMenuOpen((flag ?? !flag) || !isMenuOpen);

    return (
        <Fragment>
            <Header toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
            <div className="main">
                {/* Main Content */}
                <div className="inner-content">
                    <Routes>
                        {Object.keys(pages).map((key) => {
                            const { path, component: Component, protected: protRoute } = pages[key];
                            return (
                                <Route
                                    key={path}
                                    path={path}
                                    element={protRoute ? (
                                        <ProtectedRoute><Component/></ProtectedRoute>
                                    ) : (
                                        <Component/>
                                    )}
                                />
                            );
                        })}
                    </Routes>
                </div>
            </div>
        </Fragment>
    );
};

export default App;
