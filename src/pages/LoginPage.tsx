import React from 'react';
import Login from "../components/Login";

interface LoginProps {
    setToken: (token: string) => void;
}

const LoginPage: React.FC<LoginProps> = ({ setToken }) => {
    return <Login setToken={setToken} />
}

export default LoginPage;