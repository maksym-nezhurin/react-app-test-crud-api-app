import UnsplashImageGallery from "../components/ImageGallery";
import {Input} from "../components/ui/input.tsx";
import debounce from 'debounce';
import React, {ChangeEvent, useState} from "react";

const GalleryPage = () => {
    const [value, setValue] = useState('general');
    const debouncedSetInputValue = debounce(setValue, 500);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        debouncedSetInputValue(event.target.value);
    };

    return <div className={'grid grid-rows-[100px_1fr] h-full'}>
        <header
            className="flex-grow bg-gray-100 rounded-xl p-3 flex items-center justify-center justify-self-center px-8">
            <div className="text-center">
                <h1 className="text-2xl font-bold mb-4 mt-4">Welcome to the Image Gallery</h1>
                <p className="mb-6">Images:</p>
            </div>
        </header>
        <div>
            <Input type={"text"} onChange={handleInputChange}/>
        </div>

        <UnsplashImageGallery query={value}/>
    </div>
}

export default GalleryPage;