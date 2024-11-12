import React, { Fragment } from 'react';
import { Route, Routes } from 'react-router-dom';
import { pages } from "./constants/pages.tsx";
import ProtectedRoute from "./components/ProtectedRoute";
import {SideBar} from "./components/SideBar";

import './App.css';

const App: React.FC = () => {
    return (
        <Fragment>
            <SideBar />

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
