import apiService from "../utils/apiService.tsx";
import {IUser} from "../types";
import {notify} from "../utils/notify.ts";
import {authStore} from "../stores/authStore.ts";

const apiUrl = import.meta.env.VITE_API_URL;
const API_URL = `${apiUrl}/api/users/`;

const api = new apiService({baseURL: API_URL});

type LoginFormInputs = Pick<IUser, 'email' | 'password'>;
type RegisterFormInputs = Pick<IUser, 'email' | 'password' | 'name'> & {
    confirmPassword: string
};
type ResetPasswordFormInputs = Pick<IUser, 'email' | 'password'> & {
    resetCode: string
};

interface IData {
    accessToken: string;
    refreshToken: string;
    name?: string;
    userId: string;
}

export const loginUser = async ({ email, password }: LoginFormInputs) => {
    const { data } = await api.post<IData>(`/login`, {
        email,
        password
    }, {
        // withCredentials: true,
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const { login } = authStore;

    login({ token: data.accessToken, user: {
            id: data.userId,
            name: data.name || 'guest',
        }
    });
    notify('You are successfully logged!', 'success')
    return { token: data.accessToken };
}

export const logoutUser = async () => {
    const { logout } = authStore;
    const { data } = await api.post(`/logout`, {});
    console.log('data', data);
    logout();
    // login(data.accessToken, data.userId);
    notify('You are successfully logged out!', 'warning')
    return data;
}

export const registerUser = async ({
    name,
    email,
    password,
    confirmPassword
}: RegisterFormInputs ) => {
    const { data } = await api.post<{message: string; payload: IData }>(`/register`, {
        name,
        email,
        password,
        confirmPassword
    }, {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json'
        }
    });

    notify(data.message, 'success');

    const { token } = await loginUser({ email, password });

    return data.payload && token ? token : null;
}

export const resetUserPassword = async ({
                                            email
                                        }: { email: string }) => {
    const { data } = await api.post<{message: string; status: string }>(`/request-password-reset-code`, {
        email
    });
    console.log('data in resetUserPassword()', data)
    notify(data.message, 'success');

    return { status: data.status};
}

export const verifyPassword = async ({
                                            resetCode,
                                            email,
                                            password
                                        }: ResetPasswordFormInputs) => {
    const { data } = await api.post<{message: string; payload: IData }>(`/verify-reset-code`, {
        resetCode,
        email,
        password
    });

    notify(data.message, 'success');

    return !!data.message;
}
