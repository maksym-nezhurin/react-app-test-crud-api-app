import React from "react";
import ImageGenerator from "../components/ImageGenerator";

export const AIGeneratorPage: React.FC  = () => {
    return (<div className={'grid h-full grid-rows-[auto_1fr_auto]'}>
        <header className="flex-grow bg-gray-100 rounded-xl p-3 flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-2xl font-bold mb-4">Welcome to AI Image generator</h1>
                <p className="mb-6">The easiest way to create the creative images.</p>
            </div>
        </header>

        <main className={'flex justify-center'}>
            <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
                <div className="flex gap-4 justify-center">
                    <ImageGenerator/>
                </div>
            </div>
        </main>

        <footer className="bg-gray-500 text-white">
            <div className="container mx-auto text-center p-4">
                <p>Copyright © 2023 Your Company</p>
            </div>
        </footer>
    </div>)
}