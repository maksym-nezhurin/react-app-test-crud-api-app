// @ts-nocheck

import { useState, useEffect, useCallback } from 'react';
import ApiService from '../utils/apiService.tsx';

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

const apiUrl = import.meta.env.VITE_API_URL;

const useFetchData = <T,>(
  url: string,
  method: 'get' | 'post' | 'put' | 'delete' | 'patch' = 'get',
  requestData: any = {},
  config: any = {},
  dependencies: any[] = []
): FetchState<T> => {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  const apiService = new ApiService({
    baseURL: apiUrl,
  });

  const fetchData = useCallback(async () => {
    setState({ data: null, loading: true, error: null });
    try {
      let response;
      switch (method) {
        case 'post':
          response = await apiService.post<T>(url, requestData, config);
          break;
        case 'put':
          response = await apiService.put<T>(url, requestData, config);
          break;
        case 'delete':
          response = await apiService.delete<T>(url, config);
          break;
        case 'patch':
          response = await apiService.patch<T>(url, requestData, config);
          break;
        case 'get':
        default:
          response = await apiService.get<T>(url, requestData, config);
          break;
      }
      // Correctly accessing the data property of the response
      setState({ data: response.data, loading: false, error: null });
    } catch (error) {
      setState({
        data: null,
        loading: false,
        error: (error as Error).message || 'An error occurred'
      });
    }
  }, [url, method, requestData, config, apiService]);

  useEffect(() => {
    fetchData().then();
  }, [fetchData, ...dependencies]);

  useEffect(() => {
    // Adjust cleanup to cancel all requests on component unmount
    return () => apiService.cancelAllRequests();
  }, [apiService]);

  return state;
};

export default useFetchData;
