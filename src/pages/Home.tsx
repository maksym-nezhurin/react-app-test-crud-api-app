import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Login from '../components/Login';
import AxiosWrapper from '../utils/fetchWrapper';
import axios from 'axios';

interface IArticle {
  _id: string;
  title: string;
  summary: string;
}

const apiUrl = import.meta.env.VITE_API_URL;

const Home: React.FC = () => {
  const axiosWrapper = new AxiosWrapper({ baseURL: `${apiUrl}/api/articles` });
  const [articles, setArticles] = useState<IArticle[]>([]);
  const [token, setToken] = useState<string | null>(localStorage.getItem('authToken'));

  useEffect(() => {
    const getUserData = async (token) => {
      const data = await axiosWrapper.post(`${apiUrl}/api/users/refreshToken`, {
        refreshToken: token
      });

      setToken(data.accessToken);
    }

    if (token) {
      const token = localStorage.getItem('refreshToken')
      getUserData(token)
    }
    
    const getArticleData = async (token = null) => {
      const data = await axiosWrapper.get(`${apiUrl}/api/articles`, {
        token
      });

      setArticles(data as IArticle[]);
    }

    getArticleData(token);
  }, [token]);

  if (!token) {
    return <Login setToken={setToken} />;
  }
  
  return (
    <div>
        <div className='text-right'>
            {token && <div>
                <button onClick={() => {
                    setToken(null)
                }}>Log out</button></div>}
        </div>
      <h1>Articles</h1>
      <ul>
        {articles.map((article) => (
          <li key={article._id}>
            <Link to={`/articles/${article._id}`}>
              <h2>{article.title}</h2>
            </Link>
            <p>{article.summary}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
