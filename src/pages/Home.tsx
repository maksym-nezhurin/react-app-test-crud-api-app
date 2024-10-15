import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import AxiosWrapper from '../utils/fetchWrapper';
import { TToken } from '../types'
import Login from '../components/Login';
import ArticlePage from "./Article.tsx";

interface IArticle {
  _id: string;
  title: string;
  summary: string;
}

const apiUrl = import.meta.env.VITE_API_URL;

const Home: React.FC = () => {
  const url = window.location.hash;
  const parts = url.split('/');
  const articleId = parts[parts.length - 1];
  const [article, setArticle] = useState(articleId);
  const axiosWrapper = new AxiosWrapper({ baseURL: `${apiUrl}/api/articles` });
  const [articles, setArticles] = useState<IArticle[]>([]);
  const [token, setToken] = useState<TToken>(localStorage.getItem('authToken'));
  console.log('articleId', articleId)
  useEffect(() => {
    const getUserData = async (token: TToken) => {
      const data = await axiosWrapper.post(`${apiUrl}/api/users/refreshToken`, {
        refreshToken: token
      });

      setToken(data.accessToken as TToken);
    }
    
    const getArticleData = async (token: TToken) => {
      const data = await axiosWrapper.get(`${apiUrl}/api/articles`, {
        token
      });

      setArticles(data as IArticle[]);
    }

    try {
      getUserData(token);
      getArticleData(token);
    } catch(error) {
      console.log("Error", error);
    }
    
  }, [token]);

  if (!token) {
    return <Login setToken={setToken} />;
  }

  if (article) {
    return <>
      <button onClick={() => setArticle('')}>Back</button>
      <ArticlePage articleId={article}/>
    </>
  }

  return (
      <div>
        <div className='text-right'>
            {token && <div>
                <button onClick={() => {
                    setToken(null)
                }}>Log out</button></div>}
        </div>
      <div>
        <h1>Articles</h1>
      </div>

      <ul>
        {articles.map((article) => (
          <li key={article._id}>
            <button onClick={() => setArticle(article._id)}>{article.title}</button>
            <Link to={`/#/articles/${article._id}`}>{article.title}</Link>

            <p>{article.summary}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
