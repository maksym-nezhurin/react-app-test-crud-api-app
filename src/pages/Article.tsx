import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import {useStickyBox} from "react-sticky-box";
import io from 'socket.io-client';
import { IComment, TToken } from '../types';
import AxiosWrapper from '../utils/apiService.tsx';
import { Comment } from '../components/Comment';
import Article from "../components/Article";
import {useParams} from "react-router-dom";
import {AddCommentForm} from "../components/Forms/AddCommentForm";
import { TransitionGroup, CSSTransition } from "react-transition-group";

const apiUrl = import.meta.env.VITE_API_URL;
const socket = io(apiUrl); // Connect to your Socket.IO server
const API_URL = `${apiUrl}/api/articles`;

import './Article.css';

import StorageWrapper from '../utils/storageWrapper.ts';
import {authStore} from "../stores/authStore.ts";

const storage = new StorageWrapper();

const ArticlePage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { token } = authStore;
    const stickyRef = useStickyBox({offsetTop: 20, offsetBottom: 20});
    const userId = storage.getItem('userId');
    const axiosWrapper = new AxiosWrapper({baseURL: API_URL, token});
    const [comments, setComments] = useState<IComment[] | null>(null);

    useEffect(() => {
        try {
            const getData = async (token: TToken) => {
                const { data }= await axiosWrapper.get<{ comments: IComment[], message: string }>(`${API_URL}/${id}/comments`, {
                    token,
                });
                const {comments} = data;
                console.log('commentsData', data)
                setComments(comments);
            }

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

    // @ts-ignore
    return <div className="flex bg-blue-200 shadow-2xl p-6 rounded-xl">
        <motion.div
            initial={{ rotate: -3, scale: 1 }}
            animate={{ rotate: 3, scale: 1.2 }}
            transition={{ duration: 4, repeat: Infinity, repeatType: 'reverse' }}
            className="-rotate-3 z-[-1] left-16 top-1/4 absolute bg-yellow-50 w-[40%] h-[50%]"
        ></motion.div>

        <motion.div
            initial={{ rotate: -6, scale: 1 }}
            animate={{ rotate: 6, scale: 1.1 }}
            transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }}
            className="-rotate-6 z-[-1] right-32 top-36 absolute bg-blue-50 w-[45%] h-[70%]"
        ></motion.div>

        <motion.div
            initial={{ rotate: 12, scale: 1 }}
            animate={{ rotate: -12, scale: 0.9 }}
            transition={{ duration: 5, repeat: Infinity, repeatType: 'reverse' }}
            className="rotate-12 z-[-2] right-20 top-1/4 absolute bg-red-50 w-[45%] h-[60%]"
        ></motion.div>

        <motion.div
            initial={{ rotate: 6, scale: 1 }}
            animate={{ rotate: -6, scale: 1.3 }}
            transition={{ duration: 6, repeat: Infinity, repeatType: 'reverse' }}
            className="rotate-6 z-[-1] left-20 top-36 absolute bg-green-100 w-[40%] h-[40%]"
        ></motion.div>
        <div className={'flex flex-col w-full'}>
                <Article id={id!}/>

                <div className={'mt-6 flex flex-col md:flex-row justify-center items-start'}>
                    <AddCommentForm id={id!} userId={userId!}/>

                    <div ref={stickyRef} className="max-h-[500px] overflow-y-scroll ml-6 -rotate-0">
                        <TransitionGroup
                            className="grid grid-cols-1 direction-reverse gap-2 px-4"
                            key={id}
                            style={{gridAutoFlow: "row dense"}}
                        >
                            {comments?.length ? (comments || []).map((comment: IComment) => (
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
                            )) : <div className={'bg-white rounded-xl p-6 min-h-[250px] flex items-center'}>
                                <div>Be the first, who comment it!</div>
                            </div>}
                        </TransitionGroup>
                    </div>
                </div>
            </div>
    </div>
}

export default ArticlePage;