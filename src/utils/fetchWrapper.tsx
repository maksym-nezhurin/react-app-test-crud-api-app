// @ts-nocheck
import axios, {AxiosResponse, AxiosError, AxiosRequestConfig} from 'axios';
import {notify, soonerNotify} from './notify.ts';
import StorageWrapper from "./storageWrapper.ts";

interface ApiServiceConfig {
    baseURL: string;
    token?: string | null;
    multipartFormData?: boolean;
    timeout?: number;
}

interface RefreshTokenResponse {
    accessToken: string;
}

const storage = new StorageWrapper();

class ApiService {
    private axiosInstance: axios.Axios;
    private refreshTokenInProgress = false;
    private requestsQueue: (() => void)[] = [];
    private cancelTokenSource = axios.CancelToken.source();

    /**
     * @param baseURL
     * @param token
     * @param multipartFormData
     * @param timeout
     * @param headers
     * @param rest
     */
    constructor({
                    baseURL = import.meta.env.VITE_API_URL!,
                    token = null,
                    multipartFormData = false,
                    timeout = 2500
                }: ApiServiceConfig) {
        this.axiosInstance = axios.create({
            baseURL,
            headers: {
                'Content-Type': multipartFormData ? 'multipart/form-data' : 'application/json',
                ...(token && {'x-auth-token': `${token}`}),
            },
            timeout
            // withCredentials: true,
            // withXSRFToken: true,
        });
        console.log('s=== - - token, ', token)
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
                    notify(response.data.data.message, 'success');
                }
                return response;
            },

            async (error: AxiosError) => {
                const originalRequest = error.config;

                if (error.response?.status === 401 && !originalRequest._retry) {
                    if (this.refreshTokenInProgress) {
                        return new Promise((resolve, reject) => {
                            this.requestsQueue.push(() => {
                                originalRequest.headers['x-auth-token'] = this.axiosInstance.defaults.headers.common['x-auth-token'];
                                resolve(this.axiosInstance(originalRequest));
                            });
                        });
                    }

                    originalRequest._retry = true;
                    this.refreshTokenInProgress = true;

                    try {
                        // Call your refresh token endpoint
                        const response = await this.refreshToken();

                        this.axiosInstance.defaults.headers.common['x-auth-token'] = response.accessToken;
                        this.processQueue(null, response.accessToken);
                    } catch (refreshError) {
                        this.processQueue(refreshError, null);
                        this.cancelAllRequests();
                        storage.setItem('authToken', '');
                        storage.setItem('refreshToken', '');
                        storage.clear();

                        return Promise.reject(refreshError);
                    }

                    return this.axiosInstance(originalRequest);
                }
                this.handleError(error);
                return Promise.reject(error);
            }
        );
    }

    async refreshToken(): Promise<RefreshTokenResponse> {
        return (await this.post<RefreshTokenResponse>(`${import.meta.env.VITE_API_URL!}/api/users/refreshToken`, {
            refreshToken: storage.getItem('refreshToken'),
        })).data; // Extract data directly
    }

    processQueue(error: any, token: string | null): void {
        this.requestsQueue.forEach((cb) => cb(error, token));
        this.requestsQueue = [];
        this.refreshTokenInProgress = false;
    }

    /**
     * Method to cancel all ongoing requests
     */
    public cancelAllRequests() {
        this.cancelTokenSource.cancel('Operation canceled by the user.');
        this.cancelTokenSource = axios.CancelToken.source(); // Create a new cancel token source
    }

    /**
     * @param error
     * @private
     */
    private handleError(error: AxiosError) {
        let message = 'API Error:';
        if (error.response) {
            message += `${error.response.status} - ${error.response.data.message || error.response.statusText}`;
        } else if (error.request) {
            message = 'No response received: ' + error.request;
        } else {
            message = 'Error setting up request: ' + error.message;
        }
        soonerNotify(message);
    }

    /**
     * @param method
     * @param url
     * @param data
     * @param config
     * @private
     */
    private async request<T = unknown>(
        method: string,
        url: string,
        data: unknown = null,
        config: AxiosRequestConfig = {}
    ): Promise<AxiosResponse<T>> {
        const response = await this.axiosInstance.request<T>({method, url, data, ...config});
        return response.data;
    }

    /**
     * @param url
     * @param params
     * @param config
     */
    public get<T = unknown>(
        url: string,
        params?: Record<string, any>, // Optional params parameter
        config: AxiosRequestConfig = {}
    ): Promise<AxiosResponse<T>> {
        const mergedConfig = {
            ...config,
            params, // Merge params into the config
        };
        return this.request('get', url, undefined, mergedConfig);
    }

    /**
     * Set or update headers for the Axios instance.
     * @param headers An object containing header properties.
     */
    public setHeaders(headers: Record<string, string>): void {
        // Merge the existing headers with the new ones
        this.axiosInstance.defaults.headers.common = {
            ...this.axiosInstance.defaults.headers.common,
            ...headers
        };
    }

    /**
     * @param url
     * @param config
     */
    public delete<T = unknown>(url: string, config: AxiosRequestConfig = {}): Promise<AxiosResponse<T>> {
        return this.request<T>('delete', url, {}, config);
    }

    public post<T = unknown>(url: string, data: unknown, config: AxiosRequestConfig = {}): Promise<AxiosResponse<T>> {
        return this.request<T>('post', url, data, config);
    }

    /**
     * @param url
     * @param data
     * @param config
     */
    public put<T = unknown>(url: string, data: unknown, config: AxiosRequestConfig = {}): Promise<AxiosResponse<T>> {
        return this.request<T>('put', url, data, config);
    }

    /**
     * @param url
     * @param data
     * @param config
     */
    public patch<T = unknown>(url: string, data: unknown, config: AxiosRequestConfig = {}): Promise<AxiosResponse<T>> {
        return this.request<T>('patch', url, data, config);
    }
}

export default ApiService;
