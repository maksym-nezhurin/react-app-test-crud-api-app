import React, {useEffect, useMemo, useState} from 'react';
import AxiosWrapper from '../../utils/fetchWrapper';
import {IArticle, Status, TToken} from '../../types';
import StorageWrapper from "../../utils/storageWrapper.ts";
import {formatDate} from "../../utils/dates.ts";
import {Pencil1Icon} from "@radix-ui/react-icons"
import {cn} from "../../lib/utils.ts";
import {Button} from "../ui/button.tsx";
import {Modal} from "../Modal";
import {ArticleForm, Mode} from "../Forms/ArticleForm";
import {useAuth} from "../../contexts/AuthProvider.tsx";

const apiUrl = import.meta.env.VITE_API_URL;

const API_URL = `${apiUrl}/api/articles`;

interface ArticleProps {
    id: string
}

const storage = new StorageWrapper();

const Article: React.FC<ArticleProps> = ({id}) => {
    const [article, setArticle] = useState<IArticle | null>(null);
    const {token} = useAuth();
    const axiosWrapper = useMemo(() => new AxiosWrapper({ baseURL: API_URL, token }), [token]);
    const userId = storage.getItem('userId');

    useEffect(() => {
        const getData = async (token: TToken) => {
            const articleData = await axiosWrapper.get<IArticle>(`${API_URL}/${id}`, {
                token
            });

            // @ts-ignore
            setArticle(articleData);
        }
        getData(token);
    }, [id]);

    const onArticleUpdate = (article) => {

    }

    if (!article) {
        return <p>Loading article...</p>;
    }

    return (
        <div className={'w-full'}>
            <div className="row" style={{display: 'flex'}}>
                {
                    id && (
                        <div className="w-full">
                            <div
                                className="max-w-md mx-auto bg-white rounded-lg border border-gray-200 shadow-md">
                                <div className="p-5 pt-10 relative">

                                    <Modal
                                        title="Edit the current article"
                                        description="Put all the dat into the fields!"
                                        trigger={<div>
                                            <Button size={'sm'} variant={'outline'} className={'absolute right-4 top-10'}><Pencil1Icon /></Button>
                                        </div>}
                                    >
                                        <ArticleForm mode={Mode.edit} onSuccess={onArticleUpdate} passedData={article}/>
                                    </Modal>

                                    <div className="flex justify-between items-center mb-3">
                                        <div className="flex items-center text-gray-500 text-sm">
                                            <svg className="w-4 h-4 mr-2 fill-current"
                                                 xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                 stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                      d="M8 7V3m8 4V3m-8 4h8a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V9a2 2 0 012-2zM8 21h8m-8 0v-4m0 4H5a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2h-3m-8 0h8"/>
                                            </svg>

                                            {formatDate(article.createdAt)}
                                        </div>
                                    </div>

                                    <span className={cn(
                                        "my-2 absolute top-0 right-4 px-2 py-1 font-semibold text-sm rounded-full", {
                                            ['bg-yellow-200 text-yellow-800']: article.status === Status.Draft,
                                            ['bg-green-200 text-green-800']: article.status === Status.Published,
                                            ['bg-grey-200 text-grey-800']: article.status === Status.Archived,
                                        }
                                    )}>
                                            {article.status.toUpperCase()}
                                    </span>

                                    {article.author && (
                                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">Author: {article.author.name}</h5>
                                    )}
                                    {userId && (<p className={'text-xs text-right'}>User with id: {userId}</p>)}

                                    <h4 className={'my-2 font-bold'}>{article.title}</h4>
                                    <p className="mb-3 font-normal text-gray-700">{article.content}</p>

                                    <div className="mt-4">
                                                    <span
                                                        className="text-sm text-gray-500">Comments: {article.comments.length}</span>
                                    </div>
                                    <div className="mt-2">
                                        {article.tags.map((tag, index) => (
                                            <span key={index}
                                                  className="mr-2 bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default Article;
