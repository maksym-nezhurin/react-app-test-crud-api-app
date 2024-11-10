import {useEffect, useState} from "react";
import ApiService from "../utils/fetchWrapper.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "../components/ui/select.tsx";
import {capitalizeFirstLetter} from "../utils/strings.ts";
import NewsArticle from "../components/NewsArticle";
import type {INews} from "../types";
import {useStickyBox} from "react-sticky-box";
import {Spinner} from "../components/ui/spinner.tsx";
import {AnimatePresence, motion} from 'framer-motion';

const apiUrl = import.meta.env.VITE_API_URL;
const API_URL = `${apiUrl}/api/news`;

const NewsPage = () => {
    const axiosWrapper = new ApiService({baseURL: `${API_URL}`});
    const categories = ['general', 'technology'];
    const [selectedCategory, setCategory] = useState(categories[0]);
    const [news, setNews] = useState<INews[]>([]);
    const stickyRef = useStickyBox({offsetTop: 20, offsetBottom: 20});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getNewsData = async () => {
            setLoading(true);
            const {data} = await axiosWrapper.get<INews[]>(``, {
                category: selectedCategory
            });

            setNews(data as INews[]);
            setLoading(false)
        };

        getNewsData();
    }, [selectedCategory]);

    return <AnimatePresence>
        {
            <motion.div
                initial={{opacity: 0, scale: 0.9, y: -30}} // Start smaller and slightly above
                animate={{opacity: 1, scale: 1, y: 0}} // Grow to full size and center position
                exit={{opacity: 0, scale: 0.9, y: 30}} // Shrink slightly and move down on exit
                transition={{duration: 0.6, ease: "easeInOut"}} // Smooth transition
                className="grid h-full grid-rows-[auto_1fr_auto]"
            >
                <header
                    className={'flex-grow bg-gray-100 rounded-xl p-3 flex flex-col items-center justify-center justify-self-center px-8'}>
                    <div className="text-center">
                        <h1 className="text-2xl font-bold mb-4 text-brandRed">Welcome to News Page</h1>
                        <p className="mb-6">The easiest way to create the creative images.</p>
                    </div>

                    <Select value={selectedCategory} onValueChange={(dat) => setCategory(dat)}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Slot"/>
                        </SelectTrigger>
                        <SelectContent>
                            {categories.map((category) => <SelectItem key={category}
                                                                      value={category}>{capitalizeFirstLetter(category)}</SelectItem>)}
                        </SelectContent>
                    </Select>
                </header>

                <main className={'h-full grid grid-rows-[auto_1fr]'}>
                    <h3 className="my-4">Posts with news</h3>

                    <div ref={stickyRef}
                         className={'flex flex-wrap gap-4 mt-6 justify-center overflow-y-scroll shadow-2xl py-4 max-h-[500px] p-6'}>
                        {
                            loading ? <Spinner/> :
                                news.map((newsItem, index) => <div key={index}>
                                    <NewsArticle article={newsItem}/>
                                </div>)}
                    </div>
                </main>

                <footer className="bg-gray-500 text-white p-4">
                    <div className="container mx-auto text-center">
                        <p>Copyright © 2023 Your Company</p>
                    </div>
                </footer>
            </motion.div>
        }
    </AnimatePresence>
}

export default NewsPage;