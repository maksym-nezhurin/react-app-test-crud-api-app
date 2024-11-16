import {z} from "zod";
import AxiosWrapper from "../../../utils/apiService.tsx";
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {SubmitButton} from "../SubmitButton";
import {Form, FormControl, FormDescription, FormField, FormItem, FormMessage} from "../../ui/form.tsx";
import {Input} from "../../ui/input.tsx";
import {Fragment, useState} from "react";
import MDEditor from '@uiw/react-md-editor'
import {MultiSelect} from "../../MultiSelect";
import {IArticle, Status} from "../../../types";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "../../ui/select.tsx";

const formSchema = z.object({
    title: z.string().min(6, {
        message: "Title must have at least 6 symbols"
    }),
    content: z.string().min(20, {
        message: "Content must have at least 20 symbols"
    }),
    tags: z.array(z.string()).min(1, {
        message: "You must select at least one tag"
    }),
    status: z.nativeEnum(Status)
})

interface FormInput {
    title: string;
    content: string;
    status: Status;
    tags: string[],
}

const apiUrl = import.meta.env.VITE_API_URL;

interface IArticleResponse {
    article: IArticle,
    message: string
}

export enum Mode {
    edit,
    create
}

interface IProps {
    onSuccess: (data: IArticle) => void,
    passedData?: IArticle,
    mode?: Mode
}

export const ArticleForm = (props: IProps) => {
    const { onSuccess, passedData, mode = Mode.create } = props;
    const defaultData = {
        status: Status.Draft,
        title: "",
        content: "",
        tags: [],
    }
    const [requested, setRequested] = useState(false);
    const axiosWrapper = new AxiosWrapper({baseURL: `${apiUrl}/api/forms/booking`});
    const form = useForm<FormInput>({
        resolver: zodResolver(formSchema), // Apply zod resolver with schema
        defaultValues: {
            ...defaultData,
            ...(passedData && passedData)
        },
    });

    const handleSubmit: SubmitHandler<FormInput> = async (formData) => {
        try {
            setRequested(true);
            let data;

            if (mode === Mode.create) {
                const response = await axiosWrapper.post<IArticleResponse>(`${apiUrl}/api/articles`, formData);

                data = response.data
            } else if ( mode === Mode.edit && passedData ) {
                const response = await axiosWrapper.put<IArticleResponse>(`${apiUrl}/api/articles/${passedData._id}`, formData);

                data = response.data
            }

            if (data?.article) {
                onSuccess(data.article);
            }
        } catch (err) {
            console.error('Error:', err);
        } finally {
            form.reset();
            setRequested(false);
        }
    };

    return <div className={'w-full'}>
        <h3 className={'font-bold mb-2 mt-4'}>Please, fill all article fields!</h3>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 min-w-[100px]">
                <FormField
                    control={form.control}
                    disabled={requested}
                    name="title"
                    render={({field}) => (
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
                    name="status"
                    render={({field}) => (
                        <FormItem className='relative'>
                            <FormControl>
                                <Select
                                    value={field.value} // Ensure the `field.value` is passed correctly
                                    onValueChange={field.onChange} // Trigger change events
                                    disabled={requested}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select Status"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Object.entries(Status).map(([key, value]) =>
                                            <SelectItem key={key} value={value}>{key}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage className="absolute text-red-500 text-sm mt-1 bottom-[-20px] left-0 w-full overflow-hidden text-nowrap text-ellipsis" />
                            <FormDescription className="text-sm text-gray-500">Type article content</FormDescription>
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
                    render={({ field: { onChange, value, ref } }) => {
                        return (
                            <FormItem className='relative'>
                                <FormControl>
                                    <MultiSelect
                                        ref={ref}
                                        options={[{ value: 'test', label: 'Test'}, { value: 'test1', label: 'Test2'}]}
                                        setSelectedOptions={onChange} // Pass react-hook-form's onChange
                                        selectedOptions={value} // Pass react-hook-form's value
                                        placeholder={'Select Tags'}
                                    />
                                </FormControl>
                                <FormMessage className="absolute text-red-500 text-sm mt-1 bottom-[-20px] left-0 w-full overflow-hidden text-nowrap text-ellipsis" />
                                <FormDescription className="text-sm text-gray-500 mt-6">Select necessary tags</FormDescription>
                            </FormItem>
                        )
                    }}
                />

                <SubmitButton requested={requested} text={'Submit'}/>
            </form>
        </Form>
    </div>
}