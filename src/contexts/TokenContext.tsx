import React, { createContext, useContext, useState, ReactNode } from 'react';

// Create a context for the token
interface TokenContextType {
    token: string | null;
    setToken: (token: string | null) => void;
}

// Initialize the context with default values (token and setToken)
const TokenContext = createContext<TokenContextType | undefined>(undefined);

// Token provider to wrap the app
export const TokenProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string | null>(null);

    return (
        <TokenContext.Provider value={{ token, setToken }}>
            {children}
        </TokenContext.Provider>
    );
};

// Custom hook to access the token context
export const useToken = () => {
    const context = useContext(TokenContext);
    if (!context) {
        throw new Error('useToken must be used within a TokenProvider');
    }
    return context;
};
