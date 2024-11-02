// AuthContext.tsx
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import StorageWrapper from "../utils/storageWrapper.ts";

interface AuthContextType {
    token: string | null;
    login: (newToken: string, newRefreshToken: string, userId: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

const storage = new StorageWrapper();

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [token, setToken] = useState<string | null>(storage.getItem('authToken'));
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
    }, [token]);

    const login = (newToken: string, newRefreshToken: string, userId: string) => {
        setToken(newToken);
        storage.setItem('authToken', newToken);
        if (newRefreshToken)
            storage.setItem('refreshToken', newRefreshToken);
        if (userId)
            storage.setItem('userId', userId);
        navigate('/'); // Redirect to home page after login
    };

    const logout = () => {
        setToken(null);
        storage.setItem('authToken', '');
        storage.setItem('refreshToken', '');
        navigate('/login'); // Redirect to login page after logout
    };

    return (
        <AuthContext.Provider value={{ token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
