import React, {useEffect, useState} from 'react';
import AxiosWrapper from '../../utils/fetchWrapper';
import {AddCommentForm} from '../AddCommentForm';
import {TToken} from '../../types';
import StorageWrapper from "../../utils/storageWrapper.ts";

interface IArticle {
    id: string;
    title: string;
    content: string;
}

const apiUrl = import.meta.env.VITE_API_URL;

const API_URL = `${apiUrl}/api/articles`;

interface ArticleProps {
    id: string
}

const storage = new StorageWrapper();

const Article: React.FC<ArticleProps> = ({ id }) => {
    // const { id } = useParams<{ id: string }>();  // Get the article ID from the URL
    const [article, setArticle] = useState<IArticle | null>(null);
    const token = storage.getItem('authToken');
    const userId = storage.getItem('userId');
    const axiosWrapper = new AxiosWrapper({baseURL: API_URL, token});

    useEffect(() => {
        const getData = async (token: TToken) => {
            const articleData = await axiosWrapper.get(`${API_URL}/${id}`, {
                token
            });

            setArticle(articleData as IArticle);
        }
        getData(token);
    }, [id]);

    if (!article) {
        return <p>Loading article...</p>;
    }

    return (
        <div>
            <div className="row" style={{display: 'flex'}}>
                {
                    id && (
                        <div className="container mx-auto p-6">
                            <div className="flex">
                                {id && (
                                    <div className="w-full">
                                        <h2 className="text-2xl font-semibold mb-2">My id: {userId}</h2>
                                        <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
                                        <p className="text-gray-700 mb-6">{article.content}</p>

                                        <AddCommentForm id={id}/>
                                    </div>
                                )}
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default Article;
