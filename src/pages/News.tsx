import {useEffect, useState} from "react";
import AxiosWrapper from "../utils/fetchWrapper.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "../components/ui/select.tsx";
import {capitalizeFirstLetter} from "../utils/strings.ts";
import NewsArticle from "../components/NewsArticle";
import type {INews} from "../types";

const apiUrl = import.meta.env.VITE_API_URL;
const API_URL = `${apiUrl}/api/news`;

const NewsPage = () => {
    const axiosWrapper = new AxiosWrapper({baseURL: `${API_URL}`});
    const categories = ['general', 'technology'];
    const [selectedCategory, setCategory] = useState(categories[0]);
    const [news, setNews] = useState<INews[]>([]);

    useEffect(() => {
        const getNewsData = async () => {
            const {data} = await axiosWrapper.get<INews[]>(``, {
                category: selectedCategory
            });

            setNews(data as INews[])
        };

        getNewsData();
    }, [selectedCategory]);

    return <div>
        <h2 className='font-bold text-xl'>News Page!</h2>

        <Select value={selectedCategory} onValueChange={(dat) => setCategory(dat)}>
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Slot" />
            </SelectTrigger>
            <SelectContent>
                {categories.map((category) => <SelectItem key={category} value={category}>{capitalizeFirstLetter(category)}</SelectItem>)}
            </SelectContent>
        </Select>

        <h3 className="my-4">Posts with news</h3>

        <div className={'flex flex-wrap gap-4 mt-6 justify-center'}>
            {news.map((newsItem, index) => <div key={index}>
                <NewsArticle article={newsItem}/>
            </div>)}
        </div>
    </div>
}

export default NewsPage;