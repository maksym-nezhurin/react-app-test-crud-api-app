import React, { useState } from 'react';
import AxiosWrapper from '../../utils/fetchWrapper';

const apiUrl = import.meta.env.VITE_API_URL;

interface IProps {
    id: string
}

export const AddCommentForm = (props: IProps) => {
    const { id } = props;
    const token = localStorage.getItem('authToken');
    const axiosWrapper = new AxiosWrapper({ baseURL: `${apiUrl}/api/articles`, token });
    const [content, setContent] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await axiosWrapper.post(`${apiUrl}/api/articles/${id}/comments`, JSON.stringify({content}), {
                token: token
            });
    
            setContent('');
          } catch (error) {
            console.error('Error submitting comment:', error);
          }
    };    
    
    return <form onSubmit={handleSubmit} style={{
            margin: "1rem", 
            backgroundColor: "grey", 
            padding: "1rem", 
            borderRadius: "1rem", 
            display: "flex", 
            flexDirection: "column",
            gap: "1rem" 
        }}>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write a comment"
              required
            ></textarea>
          
            <button type="submit">Submit</button>
          </form>
}