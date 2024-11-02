// src/pages/NotFound.tsx
import React from 'react';

import Link from "../components/Link";

const NotFound: React.FC = () => {
    return (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
            <h1>404 - Page Not Found</h1>
            <p>The page you’re looking for doesn’t exist.</p>

            <Link to="/" variant={'subtle'}>
                Go back to Home
            </Link>
        </div>
    );
};

export default NotFound;
