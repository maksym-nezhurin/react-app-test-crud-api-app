
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import {notify} from '../utils/notify';

interface AxiosWrapperConfig {
    baseURL: string;
    token?: string | null;
    multipartFormData?: boolean;
    timeout: number;
}

class AxiosWrapper {
    private axiosInstance: AxiosInstance;
    private cancelTokenSource = axios.CancelToken.source();

    constructor({ baseURL = process.env.NEXT_PUBLIC_LARAVEL_API_URL!, token = null, multipartFormData = false, timeout = 2500 }: AxiosWrapperConfig) {
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

        this.axiosInstance.interceptors.request.use(async (config) => {
            // const { user, expires } = await getSession() || {};

            if (false) {
                // TODO: fix expired date
                // const expiredAt =  new Date(expires).getTime();
                //
                // if (Date.now() > expiredAt) {
                //     signOut();
                // }
            }

            // if (user) {
            //     config.headers.Authorization = `Bearer ${user.token}`;
            // }

            config.cancelToken = this.cancelTokenSource.token;
            return config;
        }, (error) => {

            return Promise.reject(error);
        });

        this.axiosInstance.interceptors.response.use(
            (response: AxiosResponse) => {
                if (response.status === 201) {
                    notify(response.statusText, 'success');
                }
                
                return response;
            },
            (error) => {
                this.handleError(error);
                return Promise.reject(error);
            }
        );
    }

    // Method to cancel all ongoing requests
    cancelAllRequests() {
        this.cancelTokenSource.cancel('Operation canceled by the user.');
    }

    private handleError(error: any) {
        let message = 'API Error:';

        if (error.response) {
            message = `API Error: ${error.response.status} - ${error.response.data || error.response.statusText}`;
        } else if (error.request) {
            message = 'No response received: ' + error.request;
        } else {
            message = 'Error setting up request: ' + error.message;
        }

        notify(message);
    }

    private async request(method: string, url: string, data: any = null, config: AxiosRequestConfig = {}): Promise<any> {
        try {
            const { data: responseData } = await this.axiosInstance.request({ method, url, data, ...config });

            return responseData;
        } catch (error) {
            throw error;
        }
    }

    public get<T = any>(url: string, config: AxiosRequestConfig = {}): Promise<T> {
        return this.request('get', url, null, config);
    }

    public delete<T = any>(url: string, config: AxiosRequestConfig = {}): Promise<T> {
        return this.request('delete', url, null, config);
    }

    public post<T = any>(url: string, data: any, config: AxiosRequestConfig = {}): Promise<T> {
        return this.request('post', url, data, config);
    }

    public put<T = any>(url: string, data: any, config: AxiosRequestConfig = {}): Promise<T> {
        return this.request('put', url, data, config);
    }

    public patch<T = any>(url: string, data: any, config: AxiosRequestConfig = {}): Promise<T> {
        return this.request('patch', url, data, config);
    }
}

export default AxiosWrapper;
