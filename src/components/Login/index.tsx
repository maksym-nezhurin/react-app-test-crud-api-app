// @ts-nocheck

import React, {useEffect, useState} from 'react';
import AxiosWrapper from '../../utils/fetchWrapper';
import {Input} from "../ui/input.tsx";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "../ui/form.tsx";
import {zodResolver} from "@hookform/resolvers/zod"
import { useNavigate } from 'react-router-dom';
import {useForm} from "react-hook-form"
import {z} from "zod"
import PasswordField from "../PasswordField";
import {SubmitButton} from "../Forms/SubmitButton";
import {useAuth} from "../../contexts/AuthProvider.tsx";

interface IData {
    accessToken: string;
    refreshToken: string;
    userId: string;
}

interface LoginFormInputs {
    email: string;
    password: string;
}

const apiUrl = import.meta.env.VITE_API_URL;

const formSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
    password: z.string().min(6, {
        message: "Password must be at least 6 symbols"
    })
})

const Login: React.FC = () => {
    const { token, login } = useAuth();
    const navigate = useNavigate();
    const form = useForm({
        resolver: zodResolver(formSchema), // Apply zod resolver with schema
        defaultValues: {
            email: "",
            password: ""
        },
    });
    const [requested, setRequested] = useState(false);

    const axiosWrapper = new AxiosWrapper({baseURL: `${apiUrl}/api/users/login`});

    const handleSubmit = async ({ email, password }: LoginFormInputs) => {
        try {
            setRequested(true);
            const data = await axiosWrapper.post<IData>(`${apiUrl}/api/users/login`, {
                email,
                password,
            });

            const {accessToken, refreshToken, userId} = data;

            login(accessToken, refreshToken, userId);

            navigate('/');
        } catch (err) {
            console.log('err', err)
        } finally {
            setRequested(false);
        }
    };

    useEffect(() => {
        if (token) {
            navigate('/')
        }
    }, [token]);

    return (
        <div className="relative">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 min-w-[300px]">
                    {/* Email Field */}
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className={'relative'}>
                                <FormLabel className="text-sm font-medium text-gray-700">Email</FormLabel>
                                <FormControl>
                                    <Input
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        placeholder="Email"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage className="absolute text-red-500 text-sm mt-1 bottom-[-20px] left-0 w-full overflow-hidden text-nowrap text-ellipsis" />
                            </FormItem>
                        )}
                    />

                    <PasswordField form={form} />

                    <SubmitButton requested={requested} text={'Login'} />
                </form>
            </Form>
        </div>
    );

};

export default Login;
