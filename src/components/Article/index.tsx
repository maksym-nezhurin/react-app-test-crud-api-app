import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AxiosWrapper from '../../utils/fetchWrapper';
import { AddCommentForm } from '../AddCommentForm';
import { TToken } from '../../types';

interface IArticle {
  id: string;
  title: string;
  content: string;
}

const apiUrl = import.meta.env.VITE_API_URL;

const API_URL = `${apiUrl}/api/articles`

const Article: React.FC = () => {
  const { id } = useParams<{ id: string }>();  // Get the article ID from the URL
  const [article, setArticle] = useState<IArticle | null>(null);
  const token = localStorage.getItem('authToken');
  const userId = localStorage.getItem('userId');
  const axiosWrapper = new AxiosWrapper({ baseURL: API_URL, token });

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
      </div>
    </div>
  );
};

export default Article;
