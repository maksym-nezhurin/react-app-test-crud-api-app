import React from 'react';
import Login from "../components/Login";

const LoginP: React.FC<LoginProps> = () => {
    return <div className={'h-full contents'}>
        <h3>Please, enter your credentials!</h3>

        <Login />

        <div className="footer">
            <p>Privacy reserved!</p>
        </div>
    </div>
}

export default LoginP;