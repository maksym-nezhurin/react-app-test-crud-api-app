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
    userId: string;
}

const { login } = authStore;

export const loginUser = async ({ email, password }: LoginFormInputs) => {
    const { data } = await api.post<IData>(`/login`, {
        email,
        password
    });

    login(data.accessToken, data.userId);
    notify('You are successfully logged!', 'success')
    return { token: data.accessToken };
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
