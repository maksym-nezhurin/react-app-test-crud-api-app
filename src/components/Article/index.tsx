import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { io } from 'socket.io-client';
import { Comment } from '../Comment';

interface Article {
  id: string;
  title: string;
  content: string;
}

interface IComment {
    id: string;
    title: string;
    content: string;
  }

  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  const socket = io('http://localhost:5005'); // Connect to your Socket.IO server
const API_URL = `http://localhost:5005/api/articles`

const Article: React.FC = (props) => {
    const myColor = getRandomColor();
    
  const { id } = useParams<{ id: string }>();  // Get the article ID from the URL
  const [article, setArticle] = useState<Article | null>(null);
  const [comments, setComments] = useState<IComment[] | null>([]);
  const [content, setContent] = useState('');
  const token = localStorage.getItem('authToken');
  const userId = localStorage.getItem('userId');

  useEffect(() => {    
    // Fetch the article from the API using the ID from the URL
    axios
      .get(`http://localhost:5005/api/articles/${id}`)
      .then((response) => {
        setArticle(response.data);
      })
      .catch((error) => {
        console.error('Error fetching article:', error);
      });
  }, [id]);

  // Fetch existing comments when the component mounts
  useEffect(() => {
    axios
      .get(`${API_URL}/${id}/comments`, {
        headers: {
            'Content-Type': 'application/json',
          'x-auth-token': token, // Replace with actual auth token
        },
      })
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => {
        console.error('Error fetching comments:', error);
      });

      socket.on('connect', () => {
        console.log('Connected to the server');
      });

    // Listen for real-time comments
    socket.on('comment-added', (comment: IComment) => {
      setComments((prevComments) => [...prevComments, comment]);
    });

    // Cleanup the socket event when the component unmounts
    return () => {
      socket.off('comment-added');
    };
  }, []);

  // Handle form submission to send a new comment
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${API_URL}/${id}/comments`,
        { content },
        {
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token, // Replace with actual auth token
          },
        }
      );

      // Clear the input field
      setContent('');
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  if (!article) {
    return <p>Loading article...</p>;
  }

  return (
    <div>
        <h2>My id: {userId}</h2>
      <h1>{article.title}</h1>
      <p>{article.content}</p>
      <div className='d-flex' style={{ display: 'grid', justifyContent: 'space-between', flexDirection: 'column', padding: "0 1rem", gap: '0.5rem'}}>{comments.length && comments.map((comment) => {
        console.log('userId', )
        return <Comment data={comment} color={userId === comment.user ? myColor: '#cccccc'} />
      })}</div>

        <form onSubmit={handleSubmit}>
         <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write a comment"
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Article;