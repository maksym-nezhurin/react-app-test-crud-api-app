import React, { useEffect, useState, Fragment } from 'react';
import { Route, Routes } from 'react-router-dom';
import StorageWrapper from './utils/storageWrapper.ts';
import Link from './components/Link';
import './App.css';
import { pages } from "./constants/pages.tsx";
import { useAuth } from "./contexts/AuthProvider.tsx";
import ProtectedRoute from "./components/ProtectedRoute";
import { HamburgerMenuIcon, Cross1Icon } from "@radix-ui/react-icons"
import {Button} from "./components/ui/button.tsx";

const storage = new StorageWrapper();

const App: React.FC = () => {
    const { logout, token } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        if (token) {
            storage.setItem('authToken', token);
        }
    }, [token]);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <Fragment>
            <div className="absolute left-0 top-0 w-full">
                <div></div>

                <div
                    className={`fixed inset-y-0 left-0 z-20 w-64 md:w-full p-4 bg-white shadow-md transition-transform transform ${
                        isMenuOpen ? "translate-x-0" : "-translate-x-full"
                    } md:relative md:translate-x-0`}
                >
                    <Button
                        variant={'secondary'}
                        onClick={toggleMenu}
                        className="z-50 absolute left-full md:hidden"
                    >
                        {isMenuOpen ? <Cross1Icon /> : <HamburgerMenuIcon />}
                    </Button>
                    <nav className="flex flex-col md:flex-row h-full">
                        {Object.keys(pages).map((key) => {
                            const {path, lable, hidden} = pages[key];

                            return hidden ? null : (
                                <Link
                                    key={path}
                                    to={path}
                                    onClick={() => setIsMenuOpen(false)} // Close menu on link click
                                >
                                    {lable}
                                </Link>
                            );
                        })}
                        <div className={'flex-1 flex md:justify-end'}>
                            <div className={'flex items-end md:justify-end'}>
                                {!token && <Link variant={'primary'} to="/login">Login</Link>}

                                {token && (
                                    <button
                                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 w-full"
                                        onClick={() => {
                                            logout();
                                            setIsMenuOpen(false); // Close menu on logout
                                        }}
                                    >
                                        Log out
                                    </button>
                                )}
                            </div>
                        </div>

                    </nav>

                </div>
            </div>
            <div className="main">

                {/* Main Content */}
                <div className="inner-content">
                    <Routes>
                        {Object.keys(pages).map((key) => {
                            const {path, component: Component, protected: protRoute} = pages[key];
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
