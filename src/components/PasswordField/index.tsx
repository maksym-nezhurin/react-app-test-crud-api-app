import React, {useState} from 'react';
import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "../ui/form.tsx";
import {Input} from "../ui/input.tsx";
import { UseFormReturn } from "react-hook-form";

interface PasswordFieldProps {
    form: UseFormReturn; // Type of the form instance
}
const PasswordField: React.FC<PasswordFieldProps> = ({form}) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <FormField
            control={form.control}
            name="password"
            render={({field}) => (
                <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">Password</FormLabel>
                    <FormControl>
                        <div className="relative">
                            <Input
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Password"
                                type={showPassword ? 'text' : 'password'}  // Toggle between text and password
                                {...field}
                            />
                            {/* Toggle Button */}
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                            >
                                {showPassword ? (
                                    <svg
                                        className="h-5 w-5 text-gray-500"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm-9.53 6.12A9.966 9.966 0 012 12c0-2.21.714-4.26 1.92-5.88M2.82 2.82a.75.75 0 111.06 1.06M21.18 21.18a.75.75 0 01-1.06-1.06"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        className="h-5 w-5 text-gray-500"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M12 4.5c4.136 0 7.48 3.022 8.4 7.2-.92 4.178-4.264 7.2-8.4 7.2-4.136 0-7.48-3.022-8.4-7.2.92-4.178 4.264-7.2 8.4-7.2zm0 1.5a6.972 6.972 0 00-6.4 4.8 6.972 6.972 0 006.4 4.8 6.972 6.972 0 006.4-4.8 6.972 6.972 0 00-6.4-4.8z"
                                        />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </FormControl>
                    <FormDescription className="text-sm text-gray-500">Enter your password</FormDescription>
                    <FormMessage className="text-red-500 text-sm mt-1"/>
                </FormItem>
            )}
        />
    );
};

export default PasswordField;
