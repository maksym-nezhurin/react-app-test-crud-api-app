import apiService from '../utils/apiService.tsx';
import { soonerNotify } from '../utils/notify.ts';
import { AIImage } from '../types';

const apiUrl = import.meta.env.VITE_API_URL;
const API_URL = `${apiUrl}/api/ai/`;

const api = new apiService({ baseURL: API_URL, timeout: 50000 });

const getAIImages = async () => {
  const { data } = await api.get<{ images: AIImage[], message: string }>('images', {});

  soonerNotify(data.message, 'success');
  return data.images.map(image => ({
    url: image.imageData,
    alt: image.name,
  }));
};

export { api, getAIImages };