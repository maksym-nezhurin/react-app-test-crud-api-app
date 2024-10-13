import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Login from '../../components/Login';
import axios from 'axios';

interface Article {
  id: string;
  title: string;
  summary: string;
}

const Home: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [token, setToken] = useState<string | null>(localStorage.getItem('authToken'));

  useEffect(() => {
    // Fetch the list of articles from the API
    axios
      .get('http://localhost:5005/api/articles')
      .then((response) => {
        setArticles(response.data);
      })
      .catch((error) => {
        console.error('Error fetching articles:', error);
      });
  }, []);

  useEffect(() => {
    // console.log('ENV:', env.process.REACT_APP_API_URI);
    if (token) {
      // Fetch articles only if the user is authenticated
      axios
        .get('http://localhost:5005/api/articles', {
          headers: {
            Authorization: `${token}`,
          },
        })
        .then((response) => {
          setArticles(response.data);
        })
        .catch((err) => {
          console.error('Error fetching articles:', err);
        });
    }
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
          <li key={article.id}>
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
