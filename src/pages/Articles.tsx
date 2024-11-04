import React from 'react';

import ArticleList from "../components/ArticleList";

const ArticlesPage: React.FC = () => {
    return (
        <div className={'grid h-full grid-rows-[auto_1fr_auto]'}>
            <header
                className="flex-grow bg-gray-100 rounded-xl p-3 flex items-center justify-center justify-self-center px-8">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">The list of articles:</h1>
                    <p className="mb-6">Look please for an article that interested for you!.</p>
                </div>
            </header>
            <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
                <div className="flex gap-4">
                    <ArticleList/>
                </div>
            </div>
        </div>
    );
};

export default ArticlesPage;
