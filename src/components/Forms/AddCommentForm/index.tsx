import AxiosWrapper from '../../../utils/fetchWrapper.tsx';
import {Button} from "../../ui/button.tsx";
import {Textarea} from "../../ui/textarea.tsx";
import StorageWrapper from '../../../utils/storageWrapper.ts';
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "../../ui/form.tsx";

const apiUrl = import.meta.env.VITE_API_URL;

interface IProps {
    id: string;
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

export const AddCommentForm = (props: IProps) => {
    const {id} = props;
    const form = useForm({
        resolver: zodResolver(formSchema), // Apply zod resolver with schema
        defaultValues: {
            comment: ""
        },
    });
    const token = storage.getItem('authToken');
    const axiosWrapper = new AxiosWrapper({baseURL: `${apiUrl}/api/articles`, token});

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
                  className="ml-4 mb-6 bg-white p-6 rounded-lg flex flex-col gap-4">

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
                                    className="resize-none h-32"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription className="text-sm text-gray-500">Type your name</FormDescription>

                            {/* Absolute positioning for FormMessage */}
                            <FormMessage className="absolute text-red-500 text-sm mt-1 bottom-[-20px] left-0"/>
                        </FormItem>
                    )}
                />

                <Button type="submit" className="w-full">Submit</Button>
            </form>
        </Form>
    )
}