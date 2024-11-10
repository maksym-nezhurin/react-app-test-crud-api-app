import UnsplashImageGallery from "../components/ImageGallery";
import {Input} from "../components/ui/input.tsx";
import debounce from 'debounce';
import {ChangeEvent, useState} from "react";
import {AnimatePresence, motion} from 'framer-motion';

const GalleryPage = () => {
    const [value, setValue] = useState('general');
    const debouncedSetInputValue = debounce(setValue, 500);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        debouncedSetInputValue(event.target.value);
    };

    return <AnimatePresence>
        {
            <motion.div
                initial={{opacity: 0, scale: 0.9, y: -30}} // Start smaller and slightly above
                animate={{opacity: 1, scale: 1, y: 0}} // Grow to full size and center position
                exit={{opacity: 0, scale: 0.9, y: 30}} // Shrink slightly and move down on exit
                transition={{duration: 0.6, ease: "easeInOut"}} // Smooth transition
                className="grid h-full grid-rows-[100px_1fr]"
            >
                <header
                    className="flex-grow bg-gray-100 rounded-xl p-3 flex items-center justify-center justify-self-center px-8 mb-2">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold mb-4 mt-4 text-brandRed">Welcome to the Image Gallery</h1>
                        <p className="mb-6">Images:</p>
                    </div>
                </header>
                <div>
                    <Input type={"text"} onChange={handleInputChange} className={'w-[200px] flex justify-self-center'}/>
                </div>

                <UnsplashImageGallery query={value}/>
            </motion.div>
        }
    </AnimatePresence>
}

export default GalleryPage;