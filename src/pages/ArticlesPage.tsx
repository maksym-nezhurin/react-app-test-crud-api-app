import React from 'react';
import {AnimatePresence, motion} from 'framer-motion';
import ArticleList from "../components/ArticleList";

const ArticlesPage: React.FC = () => {
    return (
        <AnimatePresence>
            {
                <motion.div
                    initial={{opacity: 0, scale: 0.9, y: -30}} // Start smaller and slightly above
                    animate={{opacity: 1, scale: 1, y: 0}} // Grow to full size and center position
                    exit={{opacity: 0, scale: 0.9, y: 30}} // Shrink slightly and move down on exit
                    transition={{duration: 0.6, ease: "easeInOut"}} // Smooth transition
                    className="h-full"
                >
                    <div className={'grid h-full grid-rows-[auto_1fr_auto]'}>
                        <header
                            className="flex-grow bg-gray-100 rounded-xl p-3 flex items-center justify-center justify-self-center px-8">
                            <div className="text-center">
                                <h1 className="text-2xl font-bold mb-4 text-brandRed">The list of articles:</h1>
                                <p className="mb-6">Look please for an article that interested for you!</p>
                            </div>
                        </header>
                        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg w-full">
                            <div className="grid grid-cols-2 gap-4 justify-between">
                                <ArticleList/>
                            </div>
                        </div>
                        <footer className={'mt-4'}>Article footer</footer>
                    </div>
                </motion.div>
            }
        </AnimatePresence>
    );
};

export default ArticlesPage;
