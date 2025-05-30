import apiService from "../utils/apiService.tsx";
import { IArticle, IComment, TToken } from '../types';
import { FormInput } from '../components/Forms/ArticleForm';
import ArticleStore from '../stores/articlesStore.ts';

const apiUrl = import.meta.env.VITE_API_URL;
const API_URL = `${apiUrl}/api/articles`;

interface IArticleResponse {
    article: IArticle;
    message: string;
}

const api = new apiService({baseURL: API_URL});
const { addArticle, removeArticle, updateArticle: editArticle } = ArticleStore;

export const getArticleById = async (id: string, token: string) => {
    const { data } = await api.get<{ article: IArticle}>(`/${id}`, { token });

    return data.article;
}

export const getArticles = async () => {
    const { data } = await api.get<{articles: IArticle[]}>(`/`, {});

    return data.articles;
}

export const createArticle = async (formData: FormInput, token: string) => {
    const { data } = await api.post<IArticleResponse>(
      `${apiUrl}/api/articles`,
      formData,
      {
          headers: {
              "x-auth-token": token,
          }
      }
    );
    addArticle(data.article);
    return data;
};

export const updateArticle = async (id: string, formData: FormInput, token: TToken) => {
    const { data } = await api.put<IArticleResponse>(`/${id}`, formData, {
        headers: {
            "x-auth-token": token,
        }
    });
    editArticle(id, data.article);
    return data;
}

export const deleteArticle = async (id: string) => {
    const { data } = await api.delete<{ message: string }>(`/${id}`);
    removeArticle(id);
    return data.message;
}

export const addCommentToArticle = async (id: string, comment: string, token: string) => {
    const { data } = await api.post<{ comment: IComment; message: string }>(`/${id}/comments`,
      JSON.stringify({ comment }),
      {
        headers: {
            "x-auth-token": token
        },
    });

    return data.comment;
}

export const getCommentsForArticle = async (id: string, token: string) => {
    const { data } = await api.get<{ comments: IComment[]; message: string }>(`/${id}/comments`, {}, {
        headers: {
            "x-auth-token": token
        },
    });

    return data.comments;
}
