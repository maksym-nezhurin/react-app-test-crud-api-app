import React, {useState} from 'react';
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "../ui/form.tsx";
import {Input} from "../ui/input.tsx";
import { UseFormReturn } from "react-hook-form";

interface PasswordFieldProps {
    label: string,
    name: string;
    form: UseFormReturn; // Type of the form instance
}
const PasswordField: React.FC<PasswordFieldProps> = ({form, label = 'Password', name = 'password'}) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <FormField
            control={form.control}
            name={name}
            render={({field}) => (
                <FormItem className={'relative'}>
                    <FormLabel className="text-sm font-medium text-gray-700">{label}</FormLabel>
                    <FormControl>
                        <div className="relative">
                            <Input
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder={label}
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
                                    // Open Eye Icon
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
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M12 12a2 2 0 110-4 2 2 0 010 4z"
                                        />
                                    </svg>
                                ) : (
                                    // Closed Eye Icon
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
                                            d="M3 3l18 18M12 5c4.136 0 7.48 3.022 8.4 7.2a9.971 9.971 0 01-2.021 4.433M12 19c-4.136 0-7.48-3.022-8.4-7.2a9.971 9.971 0 012.021-4.433"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M9.88 9.88a3 3 0 014.24 4.24"
                                        />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </FormControl>
                    <FormMessage className="absolute text-red-500 text-sm mt-1 bottom-[-20px] left-0 w-full overflow-hidden text-nowrap text-ellipsis" />
                </FormItem>
            )}
        />
    );
};

export default PasswordField;
