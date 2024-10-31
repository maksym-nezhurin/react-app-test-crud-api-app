import React, { useEffect, useState } from 'react';
import {useStickyBox} from "react-sticky-box";
import io from 'socket.io-client';
import { IComment, TToken } from '../types';
import AxiosWrapper from '../utils/fetchWrapper';
import { Comment } from '../components/Comment';
import Article from "../components/Article";
import {useParams} from "react-router-dom";
const apiUrl = import.meta.env.VITE_API_URL;
const socket = io(apiUrl); // Connect to your Socket.IO server
const API_URL = `${apiUrl}/api/articles`

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';

    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }

    return color;
}

import StorageWrapper from '../utils/storageWrapper.ts';

const storage = new StorageWrapper();

const ArticlePage: React.FC = () => {
    const myColor = getRandomColor();
    const { id } = useParams<{ id: string }>();
    const stickyRef = useStickyBox({offsetTop: 20, offsetBottom: 20});
    const token = storage.getItem('authToken');
    const userId = storage.getItem('userId');
    const axiosWrapper = new AxiosWrapper({baseURL: API_URL, token});
    const [comments, setComments] = useState<IComment[] | null>([]);

    useEffect(() => {
        const getData = async (token: TToken) => {
            const [commentsData] = await Promise.all([
                axiosWrapper.get(`${API_URL}/${id}/comments`, {
                    token,
                })
            ]);

            setComments(commentsData as IComment[]);
        }

        try {
            getData(token);

            socket.on('connect', () => {
                console.log('Connected to the server');
            });

            // Listen for real-time comments
            socket.on('comment-added', (comment: IComment) => {
                setComments((prevComments) => prevComments ? [...prevComments, comment] : [comment]);
            });
        } catch (error) {
            console.log('Error with conection.', error);
        }

        return () => {
            socket.off('comment-added');
        };
    }, [id]);


    return <div className="flex rotate-2 bg-blue-200 p-6 m-6 rounded-xl">
        <div className={'-rotate-2'}>
            <Article id={id!}/>
        </div>

        <aside ref={stickyRef} className="max-h-[500px] overflow-y-scroll ml-6 -rotate-2">
            <div
                key={myColor}
                className="grid grid-cols-1 gap-2 px-4"
                style={{gridAutoFlow: "row dense"}} // grid-auto-flow: column-reverse isn't possible directly in Tailwind.
            >
                {(comments || []).map((comment: IComment) => {
                    return (
                        comment?.user && (
                            <Comment
                                key={comment._id}
                                data={comment}
                                color={userId === comment.user ? myColor : '#cccccc'}
                            />
                        )
                    );
                })}
            </div>
        </aside>
    </div>
}

export default ArticlePage;