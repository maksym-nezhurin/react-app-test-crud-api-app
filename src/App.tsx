import React, {useEffect, Fragment} from 'react';
import {Route, Routes} from 'react-router-dom';
import {SidebarTrigger} from "./components/ui/sidebar.tsx";
import ProtectedRoute from "./components/ProtectedRoute";
import {authStore} from "./stores/authStore.ts";
import {syncLogoutWithLocalStorage} from "./stores/authSync.ts";
import {observer} from "mobx-react-lite";
import {SideBar} from "./components/SideBar";
import {pages} from "./constants/pages.tsx";
import './App.css';
import {logoutUser} from "./services/user.service.ts";

const App: React.FC = observer(() => {
    syncLogoutWithLocalStorage();
    const {token, login, isLoggedIn} = authStore;

    useEffect(() => {
        if (token) {
            if (!isLoggedIn)
            login(token);
        } else {
            if (isLoggedIn)
                logoutUser()
                // logout();
        }
    }, [token]);

    return (
        <Fragment>
            <SideBar />

            <div className="main">
                {/* Main Content */}
                <div className="inner-content">
                    <div className={'absolute'}>
                        <SidebarTrigger/>
                    </div>
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
