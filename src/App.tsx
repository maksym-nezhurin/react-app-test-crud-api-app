import React, {useEffect, useState, Fragment} from 'react';
import {Route, Routes} from 'react-router-dom';
import './App.css';
import {pages} from "./constants/pages.tsx";
import ProtectedRoute from "./components/ProtectedRoute";
import {Header} from "./components/Header";
import {authStore} from "./stores/authStore.ts";
import {syncLogoutWithLocalStorage} from "./stores/authSync.ts";
import {observer} from "mobx-react-lite";

const App: React.FC = observer(() => {
    syncLogoutWithLocalStorage();
    const {token, logout, login} = authStore;
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        if (token) {
            console.log('before log', token)
            login(token);
        } else {
            console.log('before logout')
            logout();
        }
    }, [token]);

    const toggleMenu = (flag: boolean) => setIsMenuOpen((flag ?? !flag) || !isMenuOpen);

    return (
        <Fragment>
            <Header toggleMenu={toggleMenu} isMenuOpen={isMenuOpen}/>
            <div className="main">
                {/* Main Content */}
                <div className="inner-content">
                    <Routes>
                        {Object.keys(pages).map((key) => {
                            const {path, component: Component, isProtected} = pages[key];

                            return (
                                <Route
                                    key={path}
                                    path={path}
                                    element={isProtected ? (
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
});

export default App;
