import React, {useState} from 'react';
import AxiosWrapper from '../../utils/fetchWrapper';
import {Button} from "../ui/button.tsx";
import {Textarea} from "../ui/textarea.tsx";
import StorageWrapper from '../../utils/storageWrapper.ts';

const apiUrl = import.meta.env.VITE_API_URL;

interface IProps {
    id: string
}

const storage = new StorageWrapper();

export const AddCommentForm = (props: IProps) => {
    const {id} = props;
    const token = storage.getItem('authToken');
    const axiosWrapper = new AxiosWrapper({baseURL: `${apiUrl}/api/articles`, token});
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

    return (<form
            onSubmit={handleSubmit}
            className="m-4 bg-gray-100 p-6 rounded-lg flex flex-col gap-4"
        >
            <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write a comment"
                required
                className="resize-none h-32"
            />

            <Button type="submit" className="w-full">
                Submit
            </Button>
        </form>
    )
}