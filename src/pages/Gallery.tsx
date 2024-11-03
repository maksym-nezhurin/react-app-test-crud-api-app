import UnsplashImageGallery from "../components/ImageGallery";
import {Input} from "../components/ui/input.tsx";
import debounce from 'debounce';
import {ChangeEvent, useState} from "react";

const GalleryPage = () => {
    const [value, setValue] = useState('general');
    const debouncedSetInputValue = debounce(setValue, 500);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        debouncedSetInputValue(event.target.value);
    };

    return <div className={'grid grid-rows-[100px_1fr] h-full'}>
        <div>
            <h1 className="text-2xl font-bold mb-4">Image Gallery</h1>

            <Input type={"text"} onChange={handleInputChange}/>
        </div>

        <UnsplashImageGallery query={value}/>
    </div>
}

export default GalleryPage;