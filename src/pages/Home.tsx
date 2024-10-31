import React, { useEffect } from 'react';
import AxiosWrapper from '../utils/fetchWrapper';
import { TToken } from '../types'

import StorageWrapper from '../utils/storageWrapper.ts';
import {useToken} from "../contexts/TokenContext.tsx";
import ArticleList from "../components/ArticleList";
import ImageGenerator from "../components/ImageGenerator";

const storage = new StorageWrapper();

const apiUrl = import.meta.env.VITE_API_URL;

const Home: React.FC = () => {
  const axiosWrapper = new AxiosWrapper({ baseURL: `${apiUrl}/api/articles` });
  // const [articles, setArticles] = useState<IArticle[]>([]);
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
    
    // const getArticleData = async (token: TToken) => {
    //   const data = await axiosWrapper.get(`${apiUrl}/api/articles`, {
    //     token
    //   });
    //
    //   setArticles(data as IArticle[]);
    // }

    try {
      if (token) {
        getUserData();
        // getArticleData(token);
      } else {
        // setArticles([]);
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
        Home
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

        <div className="flex gap-4">
          <ArticleList token={token} />

          <ImageGenerator />
        </div>


      </div>
  );
};

export default Home;
