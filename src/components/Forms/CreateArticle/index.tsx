import {Fragment, useState} from 'react';
import { z } from 'zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import MDEditor from '@uiw/react-md-editor';

import { Form, FormField, FormControl, FormItem, FormMessage, FormDescription } from '../../ui/form';
import { Input } from '../../ui/input';
import { MultiSelect } from '../../MultiSelect';
import { SubmitButton } from '../SubmitButton';
import { IArticle } from '../../../types';
import AxiosWrapper from '../../../utils/fetchWrapper';

const formSchema = z.object({
    title: z.string().min(6, { message: "Title must have at least 6 symbols" }),
    content: z.string().min(20, { message: "Content must have at least 20 symbols" }),
    tags: z.array(z.string()).min(1, { message: "You must select at least one tag" })
});

interface FormInput {
    title: string;
    content: string;
    tags: string[];
}

// @ts-ignore
const apiUrl = import.meta.env.VITE_API_URL;

interface IArticleResponse {
    article: IArticle;
    message: string;
}

interface IProps {
    onSuccess: (data: IArticle) => void;
}

export const ArticleForm = ({ onSuccess }: IProps) => {
    const [requested, setRequested] = useState(false);
    const axiosWrapper = new AxiosWrapper({ baseURL: `${apiUrl}/api/forms/booking` });
    const form = useForm<FormInput>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            content: "",
            tags: []
        },
    });

    const handleSubmit: SubmitHandler<FormInput> = async ({ title, content, tags }) => {
        try {
            setRequested(true);
            const { data } = await axiosWrapper.post<IArticleResponse>(`${apiUrl}/api/articles`, {
                title,
                content,
                tags
            });

            if (data.article) {
                onSuccess(data.article);
            }
        } catch (err) {
            console.error('Error:', err);
        } finally {
            form.reset();
            setRequested(false);
        }
    };

    return <div>
        <h3 className={'font-bold mb-2 mt-4'}>Please, fill all fields!</h3>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 min-w-[100px]">
                <FormField
                    control={form.control}
                    disabled={requested}
                    name="title"
                    render={({ field }) => (
                        <FormItem className="relative">
                            <FormControl>
                                <Input
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="Title"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage className="absolute text-red-500 text-sm mt-1 bottom-[-20px] left-0 w-full overflow-hidden text-nowrap text-ellipsis" />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    disabled={requested}
                    name="content"
                    render={({ field }) => (
                        <FormItem className='relative'>
                            <FormControl>
                                <Fragment>
                                    <MDEditor
                                        value={field.value}
                                        onChange={field.onChange}
                                    />
                                    <MDEditor.Markdown source={field.value} />
                                </Fragment>
                            </FormControl>
                            <FormMessage className="absolute text-red-500 text-sm mt-1 bottom-[-20px] left-0 w-full overflow-hidden text-nowrap text-ellipsis" />
                            <FormDescription className="text-sm text-gray-500">Type article content</FormDescription>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    disabled={requested}
                    name="tags"
                    render={({ field: { onChange, value, ref } }) => (
                        <FormItem className='relative'>
                            <FormControl>
                                <MultiSelect
                                    ref={ref}
                                    options={[{ value: 'test', label: 'Test' }, { value: 'test1', label: 'Test2' }]}
                                    setSelectedOptions={onChange}
                                    selectedOptions={value}
                                    placeholder={'Select Tags'}
                                />
                            </FormControl>
                            <FormMessage className="absolute text-red-500 text-sm mt-1 bottom-[-20px] left-0 w-full overflow-hidden text-nowrap text-ellipsis" />
                            <FormDescription className="text-sm text-gray-500 mt-6">Select necessary tags</FormDescription>
                        </FormItem>
                    )}
                />
                <SubmitButton requested={requested} text={'Submit'} />
            </form>
        </Form>
    </div>;
};
