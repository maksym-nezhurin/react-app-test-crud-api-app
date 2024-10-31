import React, {useEffect, useState} from 'react';
import AxiosWrapper from '../../utils/fetchWrapper';
import {TToken} from '../../types';
import {Link} from "react-router-dom";

interface IArticle {
    _id: string;
    title: string;
    summary: string;
}

const apiUrl = import.meta.env.VITE_API_URL;
const API_URL = `${apiUrl}/api/articles`;

const ArticleList: React.FC<{ token: string | null }> = ({token}) => {
    const [articles, setArticles] = useState<IArticle[]>([]);
    const axiosWrapper = new AxiosWrapper({baseURL: API_URL, token});

    useEffect(() => {
        const getArticleData = async (token: TToken) => {
            const data = await axiosWrapper.get(`${apiUrl}/api/articles`, {
                token
            });

            setArticles(data as IArticle[]);
        }

        try {
            if (token) {
                getArticleData(token);
            } else {
                setArticles([]);
            }
        } catch (error) {
            console.log("Error", error);
        }

    }, [token]);

    if (!articles) {
        return <p>Loading article...</p>;
    }

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-3xl font-bold mb-4 text-gray-900">Articles</h1>
            </div>

            <ul className="space-y-4">
                <li>List!</li>
                {articles.map((article) => (
                    <li
                        key={article._id}
                        className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-center justify-between mb-2">
                            <Link to={`/articles/${article._id}`}>{article.title}</Link>
                        </div>

                        <p className="text-gray-700">{article.summary}</p>
                    </li>
                ))}
            </ul>
        </div>

    );
};

export default ArticleList;
