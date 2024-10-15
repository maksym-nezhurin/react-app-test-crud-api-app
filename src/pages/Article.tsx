import React, { useEffect, useState } from 'react';
import {useStickyBox} from "react-sticky-box";
import io from 'socket.io-client';
import { IComment, TToken } from '../types';
import AxiosWrapper from '../utils/fetchWrapper';
import { Comment } from '../components/Comment';
import Article from "../components/Article";
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

interface ArticleProps {
    articleId: string
}

const ArticlePage: React.FC<ArticleProps> = ({ articleId: id }) => {
    const myColor = getRandomColor();
    const stickyRef = useStickyBox({offsetTop: 20, offsetBottom: 20});
    const token = localStorage.getItem('authToken');
    const userId = localStorage.getItem('userId');
    const axiosWrapper = new AxiosWrapper({ baseURL: API_URL, token });
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
        } catch(error) {
          console.log('Error with conection.', error);
        }

        return () => {
          socket.off('comment-added');
        };
    }, [id]);
    

    return <div style={{ display: 'flex' }}>
        <Article id={id} />
        
        <aside ref={stickyRef} style={{ maxHeight: '500px', overflowY: "scroll" }}>
            <div
                key={myColor}
                className='d-flex'
                style={{ display: 'grid', flexDirection: 'column-reverse', padding: "0 1rem", gap: '0.5rem'}}>{(comments || []).map((comment: IComment) => {
                    return comment?.user && <Comment key={comment._id} data={comment} color={userId === comment.user ? myColor : '#cccccc'} />
                })}
            </div>
        </aside>
    </div>
}

export default ArticlePage;