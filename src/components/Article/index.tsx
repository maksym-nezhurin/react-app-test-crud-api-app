import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import { Comment } from '../Comment';
import {useStickyBox} from "react-sticky-box";
import AxiosWrapper from '../../utils/fetchWrapper';
import { AddCommentForm } from '../AddCommentForm';
import { TToken } from '../../types';

interface IArticle {
  id: string;
  title: string;
  content: string;
}

interface IComment {
  id: string;
  title: string;
  content: string;
  user: string;
}

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
const apiUrl = import.meta.env.VITE_API_URL;

const socket = io(apiUrl); // Connect to your Socket.IO server
const API_URL = `${apiUrl}/api/articles`

const Article: React.FC = () => {
  const myColor = getRandomColor();
  const stickyRef = useStickyBox({offsetTop: 20, offsetBottom: 20})
  const { id } = useParams<{ id: string }>();  // Get the article ID from the URL
  const [article, setArticle] = useState<IArticle | null>(null);
  const [comments, setComments] = useState<IComment[] | null>([]);
  const token = localStorage.getItem('authToken');
  const userId = localStorage.getItem('userId');
  const axiosWrapper = new AxiosWrapper({ baseURL: API_URL, token });

  useEffect(() => {   
    const getData = async (token: TToken) => {
      const [articleData, commentsData] = await Promise.all([
        axiosWrapper.get(`${API_URL}/${id}`, {
          token
        }),
        axiosWrapper.get(`${API_URL}/${id}/comments`, {
          token,
        })
      ]);

      setArticle(articleData as IArticle);
      setComments(commentsData as IComment[]);
    }
    
    getData(token); 

    socket.on('connect', () => {
      console.log('Connected to the server');
    });

    // Listen for real-time comments
    socket.on('comment-added', (comment: IComment) => {
      setComments((prevComments) => prevComments ? [...prevComments, comment] : [comment]);
    });

    // Cleanup the socket event when the component unmounts
    return () => {
      socket.off('comment-added');
    };
  }, [id]);

  if (!article) {
    return <p>Loading article...</p>;
  }

  return (
    <div>
      <div className="row" style={{ display: 'flex' }}>
        {
          id && (
            <div>
              <h2>My id: {userId}</h2>
              <h1>{article.title}</h1>
              <p>{article.content}</p>

              <AddCommentForm id={id} />
            </div>
          )
        }

        <aside ref={stickyRef} style={{ maxHeight: '500px', overflowY: "scroll" }}>
          <div
              key={myColor}
              className='d-flex'
              style={{ display: 'grid', flexDirection: 'column-reverse', padding: "0 1rem", gap: '0.5rem'}}>{(comments || []).map((comment: IComment) => {
              
              return <Comment key={comment.id} data={comment} color={userId === comment?.user ? myColor: '#cccccc'} />
            })}</div>
        </aside>
      </div>
    </div>
  );
};

export default Article;
