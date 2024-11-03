import React from 'react';

import ArticleList from "../components/ArticleList";

const ArticlesPage: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <div className="mb-6">
                <h1 className="text-2xl font-bold mb-4 text-gray-900">The list of articles:</h1>
            </div>
            <div className="flex gap-4">
                <ArticleList/>
            </div>
        </div>
    );
};

export default ArticlesPage;
