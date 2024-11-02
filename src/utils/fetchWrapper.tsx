// @ts-ignore
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import {notify} from '../utils/notify';

interface ApiServiceConfig {
    baseURL: string;
    token?: string | null;
    multipartFormData?: boolean;
    timeout?: number;
}

class ApiService {
    // @ts-ignore
    private axiosInstance: axios.Axios;
    // @ts-ignore

    private cancelTokenSource = axios.CancelToken.source();

    constructor({ baseURL = import.meta.env.VITE_API_URL!, token = null, multipartFormData = false, timeout = 2500 }: ApiServiceConfig) {
        this.axiosInstance = axios.create({
            baseURL,
            headers: {
                // 'X-Requested-With': "XMLHttpRequest",
                'Content-Type': multipartFormData ? 'multipart/form-data' : 'application/json',
                ...(token && { 'x-auth-token': `${token}` })
            },
            // withCredentials: true,
            // withXSRFToken: true,
        });

        this.axiosInstance.defaults.timeout = timeout;

        this.axiosInstance.interceptors.request.use(async (config: AxiosRequestConfig) => {

            config.cancelToken = this.cancelTokenSource.token;
            return config;
        }, (error: AxiosError) => {
            return Promise.reject(error);
        });

        this.axiosInstance.interceptors.response.use(
            (response: AxiosResponse) => {                
                if (response.status === 201) {
                    notify(response.statusText, 'success');
                }
                return response;
            },

            (error: AxiosError) => {
                this.handleError(error);
                return Promise.reject(error);
            }
        );
    }

    // Method to cancel all ongoing requests
    cancelAllRequests() {
        this.cancelTokenSource.cancel('Operation canceled by the user.');
    }

    private handleError(error: AxiosError) {
        let message = 'API Error:';

        if (error.response) {
            message = `API Error: ${error.response.status} - ${error.response.data.message || error.response.statusText}`;
        } else if (error.request) {
            message = 'No response received: ' + error.request;
        } else {
            message = 'Error setting up request: ' + error.message;
        }

        notify(message);
    }

    private async request<T = unknown>(
        method: string,
        url: string,
        data: unknown = null,
        config: AxiosRequestConfig = {}
    ): Promise<AxiosResponse<T>> {
        const { data: responseData } = await this.axiosInstance.request<T>({ method, url, data, ...config });
        return responseData;
    }

    public get<T = unknown>(url: string, config: AxiosRequestConfig = {}): Promise<AxiosResponse<T>> {
        return this.request('get', url, undefined, config);
    }

    public delete<T = unknown>(url: string, config: AxiosRequestConfig = {}): Promise<T> {
        return this.request<T>('delete', url, {}, config);
    }

    public post<T = unknown>(url: string, data: unknown, config: AxiosRequestConfig = {}): Promise<T> {
        return this.request<T>('post', url, data, config);
    }

    public put<T = unknown>(url: string, data: unknown, config: AxiosRequestConfig = {}): Promise<T> {
        return this.request<T>('put', url, data, config);
    }

    public patch<T = unknown>(url: string, data: unknown, config: AxiosRequestConfig = {}): Promise<T> {
        return this.request<T>('patch', url, data, config);
    }
}

export default ApiService;
