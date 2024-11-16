// ProtectedRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import {authStore} from "../../stores/authStore.ts";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { isLoggedIn } = authStore;

    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
