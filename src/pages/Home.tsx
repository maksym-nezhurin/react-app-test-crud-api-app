import React, { useEffect, useState } from 'react';
import AxiosWrapper from '../utils/fetchWrapper';
import { TToken } from '../types'
import {Link} from "react-router-dom";

interface IArticle {
  _id: string;
  title: string;
  summary: string;
}

import StorageWrapper from '../utils/storageWrapper.ts';
import {useToken} from "../contexts/TokenContext.tsx";

const storage = new StorageWrapper();

const apiUrl = import.meta.env.VITE_API_URL;

const Home: React.FC = () => {
  const axiosWrapper = new AxiosWrapper({ baseURL: `${apiUrl}/api/articles` });
  const [articles, setArticles] = useState<IArticle[]>([]);
  const { setToken, token } = useToken();

  useEffect(() => {
    const getUserData = async () => {
      let token = null;
      try {
        const data = await axiosWrapper.post(`${apiUrl}/api/users/refreshToken`, {
          refreshToken: storage.getItem('refreshToken')
        });
        token = data.accessToken as TToken
      } catch (error) {
        console.log('error', error)
      }
      setToken(token);
    }
    
    const getArticleData = async (token: TToken) => {
      const data = await axiosWrapper.get(`${apiUrl}/api/articles`, {
        token
      });

      setArticles(data as IArticle[]);
    }

    try {
      if (token) {
        getUserData();
        getArticleData(token);
      } else {
        setArticles([]);
      }
    } catch(error) {
      console.log("Error", error);
    }
    
  }, [token]);

  const logout = () => {
    storage.setItem('authToken', '');
    storage.setItem('refreshToken', '');
    setToken(null)
  }

  return (
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        <div className="text-right mb-4 min-w-[300px]">
          {token && (
              <div>
                <button
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    onClick={() => logout()}
                >
                  Log out
                </button>
              </div>
          )}
        </div>

        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-4 text-gray-900">Articles</h1>
        </div>

        <ul className="space-y-4">
          {articles.map((article) => (
              <li
                  key={article._id}
                  className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-2">
                  <Link to={`/articles/${article._id}`}>{article.title}</Link>
                </div>

                <p className="text-gray-700">{article.summary}</p>
              </li>
          ))}
        </ul>
      </div>
  );
};

export default Home;
