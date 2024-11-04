// @ts-nocheck

import React, { useEffect, useState } from 'react';
import {useStickyBox} from "react-sticky-box";
import io from 'socket.io-client';
import { IComment, TToken } from '../types';
import AxiosWrapper from '../utils/fetchWrapper';
import { Comment } from '../components/Comment';
import Article from "../components/Article";
import {useParams} from "react-router-dom";
import {AddCommentForm} from "../components/Forms/AddCommentForm";
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const apiUrl = import.meta.env.VITE_API_URL;
const socket = io(apiUrl); // Connect to your Socket.IO server
const API_URL = `${apiUrl}/api/articles`;

import './Article.css';

import StorageWrapper from '../utils/storageWrapper.ts';

const storage = new StorageWrapper();

const ArticlePage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const stickyRef = useStickyBox({offsetTop: 20, offsetBottom: 20});
    const token = storage.getItem('authToken');
    const userId = storage.getItem('userId');
    const axiosWrapper = new AxiosWrapper({baseURL: API_URL, token});
    const [comments, setComments] = useState<IComment[] | null>(null);

    useEffect(() => {
        const getData = async (token: TToken) => {
            const commentsData= await axiosWrapper.get<IComment[]>(`${API_URL}/${id}/comments`, {
                token,
            });

            setComments(commentsData);
        }

        try {
            getData(token);

            socket.on('connect', () => {
                console.log('Connected to the server');
            });

            // Listen for real-time comments
            socket.on('comment-added', (comment: IComment) => {
                setComments((prevComments) => prevComments ? [comment, ...prevComments] : [comment]);
            });
        } catch (error) {
            console.log('Error with conection.', error);
        }

        return () => {
            socket.off('comment-added');
        };
    }, [id]);

    return <div className="flex bg-blue-200 shadow-2xl p-6 rounded-xl">
        <div className="-rotate-3 z-[-1] left-7 top-1/4 absolute bg-yellow-50 w-[80%] h-[70%]"></div>
        <div className="-rotate-6 z-[-1] right-7 top-36 absolute bg-blue-50 w-[45%] h-[70%]"></div>
        <div className="rotate-12 z-[-2] right-7 top-1/4 absolute bg-red-50 w-[45%] h-[70%]"></div>
        <div className="rotate-6 z-[-1] left-9 top-36 absolute bg-green-100 w-[70%] h-[70%]"></div>
        <div className={'flex flex-col w-full'}>
            <Article id={id!}/>

            <div className={'mt-6 flex flex-col md:flex-row justify-center items-start'}>
                <AddCommentForm id={id}/>

                <div ref={stickyRef} className="max-h-[500px] overflow-y-scroll ml-6 -rotate-0">
                    <TransitionGroup
                        className="grid grid-cols-1 direction-reverse gap-2 px-4"
                        key={id}
                        style={{gridAutoFlow: "row dense"}}
                    >
                        {(comments || []).map((comment: IComment) => (
                                <CSSTransition
                                    key={comment._id}
                                    timeout={500}
                                    classNames="item"
                                >
                                    {comment?.user && (
                                        <Comment
                                            key={comment._id}
                                            data={comment}
                                            isAuthor={userId === comment.user}
                                        />
                                    )}
                                </CSSTransition>
                        ))}
                    </TransitionGroup>
                </div>
            </div>
        </div>
    </div>
}

export default ArticlePage;