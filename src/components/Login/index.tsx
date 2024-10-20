// @ts-nocheck

import React from 'react';
import AxiosWrapper from '../../utils/fetchWrapper';
import {Input} from "../ui/input.tsx";
import {Button} from "../ui/button.tsx";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "../ui/form.tsx";
import {zodResolver} from "@hookform/resolvers/zod"
import { useNavigate } from 'react-router-dom';
import {useForm} from "react-hook-form"
import {z} from "zod"
import PasswordField from "../PasswordField";
import StorageWrapper from "../../utils/storageWrapper.ts";

interface LoginProps {
    setToken: (token: string) => void;
}

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

const storage = new StorageWrapper();

const Login: React.FC<LoginProps> = ({setToken}) => {
    const navigate = useNavigate();
    const form = useForm({
        resolver: zodResolver(formSchema), // Apply zod resolver with schema
        defaultValues: {
            email: "",
            password: ""
        },
    })

    const axiosWrapper = new AxiosWrapper({baseURL: `${apiUrl}/api/users/login`});

    const handleSubmit = async ({ email, password }: LoginFormInputs) => {

        try {
            const data = await axiosWrapper.post<IData>(`${apiUrl}/api/users/login`, {
                email,
                password,
            });

            const {accessToken, refreshToken, userId} = data;

            setToken(accessToken);

            // Optionally, store the token in localStorage or sessionStorage
            storage.setItem('authToken', accessToken);
            storage.setItem('refreshToken', refreshToken);
            storage.setItem('userId', userId);

            navigate('/');
        } catch (err) {
            console.log('err', err)
            // setError('Invalid credentials');
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 min-w-[300px]">
                    {/* Email Field */}
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-sm font-medium text-gray-700">Email</FormLabel>
                                <FormControl>
                                    <Input
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        placeholder="Email"
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription className="text-sm text-gray-500">Enter your email address</FormDescription>
                                <FormMessage className="text-red-500 text-sm mt-1" />
                            </FormItem>
                        )}
                    />

                    <PasswordField form={form} />

                    {/* Submit Button */}
                    <Button type="submit" className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                        Submit
                    </Button>
                </form>
            </Form>
        </div>
    );

};

export default Login;
