import apiService from '../utils/apiService.tsx';
import { soonerNotify } from '../utils/notify.ts';
import { IClarifyData } from '../types';

const apiUrl = import.meta.env.VITE_API_URL;
const API_URL = `${apiUrl}/api/ai/`;

const api = new apiService({baseURL: API_URL, timeout: 50000});

interface IData {
  imageUrl?: string
}

export const getServiceAvailability = async () => {
  const { data } = await api.get<{ data: IClarifyData, message: string}>('availability', {});
  const { data: {state, numberOfRealRequests, available}, message } = data;

  soonerNotify(message + `current number of requests ${numberOfRealRequests}`, state)
  return {
    available,
    numberOfRealRequests
  };
}

export const generateImage = async (tag: string) => {
  const {data} = await api.post<IData>(`${apiUrl}/api/ai/generate-image`, {
    tag
  });

  return data.imageUrl;
}
