import AxiosWrapper from '../../../utils/apiService.tsx';
import {Button} from "../../ui/button.tsx";
import {Textarea} from "../../ui/textarea.tsx";
import StorageWrapper from '../../../utils/storageWrapper.ts';
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "../../ui/form.tsx";
import {useEffect, useState} from "react";
import io from "socket.io-client";

const apiUrl = import.meta.env.VITE_API_URL;

interface IProps {
    id: string;
    userId: string | undefined;
}

interface FormInput {
    comment: string;
}

const formSchema = z.object({
    comment: z.string().min(6, {
        message: "Please enter at least 6 symbols",
    }),
})

const storage = new StorageWrapper();

const socket = io(apiUrl);

export const AddCommentForm = (props: IProps) => {
    const {id, userId} = props;
    const form = useForm({
        resolver: zodResolver(formSchema), // Apply zod resolver with schema
        defaultValues: {
            comment: ""
        },
    });
    const token = storage.getItem('authToken');
    const axiosWrapper = new AxiosWrapper({baseURL: `${apiUrl}/api/articles`, token});
    const [isTyping, setIsTyping] = useState(false);
    const [typingUsers, setTypingUsers] = useState([]);

    useEffect(() => {
        // Listen for typing updates from the server
        socket.on('userTyping', (user: string) => {
            // @ts-ignore
            setTypingUsers((prev: string[]) => [...new Set([...prev, user])]);
        });

        socket.on('userStopTyping', (user: string) => {
            setTypingUsers((prev) => prev.filter((u) => u !== user));
        });

        return () => {
            socket.off('userTyping');
            socket.off('userStopTyping');
        };
    }, []);

    const handleKeyPress = () => {
        if (!isTyping) {
            setIsTyping(true);
            socket.emit('typing', userId); // Replace with dynamic user data
        }

        // Stop typing after a delay
        setTimeout(() => {
            setIsTyping(false);
            socket.emit('stopTyping', userId); // Replace with dynamic user data
        }, 2000);
    }

    const handleSubmit = async ({comment}: FormInput) => {
        try {
            await axiosWrapper.post(`${apiUrl}/api/articles/${id}/comments`, JSON.stringify({comment}));
            form.reset();
        } catch (error) {
            console.error('Error submitting comment:', error);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}
                  className="ml-4 w-[350px] mb-6 bg-white p-6 rounded-lg flex flex-col gap-4">

                <FormField
                    control={form.control}
                    name="comment"
                    render={({field}) => (
                        <FormItem className="relative">
                            <FormLabel className="text-sm font-medium text-gray-700">Enter comment:</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Write a comment"
                                    required
                                    onKeyPress={handleKeyPress}
                                    className="resize-none h-32 w-full"
                                    {...field}
                                />
                            </FormControl>
                            {typingUsers.length > 0 && (
                                <FormDescription className="text-sm text-gray-500 w-full absolute">
                                    {typingUsers.join(', ')} {typingUsers.length > 1 ? 'are' : 'is'} typing...
                                </FormDescription>
                            )}

                            {/* Absolute positioning for FormMessage */}
                            <FormMessage className="absolute text-red-500 text-sm mt-1 bottom-[-20px] left-0"/>
                        </FormItem>
                    )}
                />

                <Button type="submit" className="w-full mt-4">Submit</Button>
            </form>
        </Form>
    )
}