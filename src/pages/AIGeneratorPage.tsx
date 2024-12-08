import React, { useEffect, useState } from 'react';
import ImageGenerator from "../components/ImageGenerator";
import {AnimatePresence, motion} from 'framer-motion';
import { Carousel } from '../components/Carousel';
import { getAIImages, api } from '../services/image.service.ts';

interface IImg {
    url: string; alt: string;
}

export const AIGeneratorPage: React.FC = () => {
    const [imgs, setImgs] = useState<IImg[]>([]);

    useEffect(() => {
        getAIImages().then((images = []) => {
            setImgs(images);
        });

        return () => api.cancelAllRequests()
    }, [])

    return (<AnimatePresence>
        {
            <motion.div
                initial={{opacity: 0, scale: 0.9, y: -30}} // Start smaller and slightly above
                animate={{opacity: 1, scale: 1, y: 0}} // Grow to full size and center position
                exit={{opacity: 0, scale: 0.9, y: 30}} // Shrink slightly and move down on exit
                transition={{duration: 0.6, ease: "easeInOut"}} // Smooth transition
                className="grid h-full grid-rows-[auto_1fr_auto]"
            >
                <header
                    className="flex-grow bg-gray-100 rounded-xl p-3 flex items-center justify-center justify-self-center px-8">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold mb-4 text-brandRed">Welcome to AI Image generator</h1>
                        <p className="mb-6">The easiest way to create the creative images.</p>
                    </div>
                </header>

                <main className={'flex justify-center'}>
                    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg w-full">
                        <div className="flex gap-4 justify-center">
                            <ImageGenerator />
                        </div>

                        <div className={'my-6'}>
                            <Carousel images={imgs} />
                        </div>
                    </div>
                </main>

                <footer className="bg-gray-500 text-white">
                    <div className="container mx-auto text-center p-4">
                        <p>Copyright © 2023 Your Company</p>
                    </div>
                </footer>
            </motion.div>
        }
    </AnimatePresence>)
}