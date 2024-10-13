import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Login from '../components/Login';
import axios from 'axios';

interface IArticle {
  _id: string;
  title: string;
  summary: string;
}

const apiUrl = import.meta.env.VITE_API_URL;

const Home: React.FC = () => {
  const [articles, setArticles] = useState<IArticle[]>([]);
  const [token, setToken] = useState<string | null>(localStorage.getItem('authToken'));

  useEffect(() => {
    // Fetch the list of articles from the API
    axios
      .get(`${apiUrl}/api/articles`)
      .then((response) => {
        setArticles(response?.data as IArticle[]);
      })
      .catch((error) => {
        console.error('Error fetching articles:', error);
      });
  }, []);

  useEffect(() => {
    if (token) {
      // Fetch articles only if the user is authenticated
      axios
        .get(`${apiUrl}/api/articles`, {
          headers: {
            Authorization: `${token}`,
          },
        })
        .then((response) => {
          setArticles(response?.data as IArticle[]);
        })
        .catch((err) => {
          console.error('Error fetching articles:', err);
        });
    }
  }, [token]);

  if (!token) {
    return <Login setToken={setToken} />;
  }
  
  console.log('token', token);
  
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
            {/* Link to the individual article page */}
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
