import {useState} from "react";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "../ui/form.tsx";
import {Textarea} from "../ui/textarea.tsx";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import AxiosWrapper from "../../utils/apiService.tsx";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "../ui/card.tsx";
import {SubmitButton} from "../Forms/SubmitButton";
import {ReloadIcon} from "@radix-ui/react-icons";
import { motion } from "framer-motion";

const formSchema = z.object({
    requestField: z.string().min(6, {
        message: "Text must have at least 6 symbols"
    })
})

interface FormInput {
    requestField: string;
}

interface IData {
    imageUrl?: string
}

const apiUrl = import.meta.env.VITE_API_URL;

const ImageGenerator = () => {
    const form = useForm({
        resolver: zodResolver(formSchema), // Apply zod resolver with schema
        defaultValues: {
            requestField: ""
        },
    });

    const axiosWrapper = new AxiosWrapper({baseURL: `${apiUrl}/api/ai/generate-image`, timeout: 25000});
    const [requested, setRequested] = useState(false);
    const [alt, setAlt] = useState('');
    const [imageBase64, setImageBase64] = useState('');
    const handleSubmit = async ({requestField}: FormInput) => {
        try {
            setRequested(true);
            const {data} = await axiosWrapper.post<IData>(`${apiUrl}/api/ai/generate-image`, {
                tag: requestField
            });

            if (data?.imageUrl) {
                setImageBase64(data.imageUrl);
                setAlt(requestField)
            }
            setRequested(false);
        } catch (err) {
            console.log('err', err);
            setRequested(false);
            setImageBase64('');
            // setError('Invalid credentials');
        }
    };

    return (<div>
        <div className={'flex justify-center flex-col items-center text-center'}>
            <h4 className={'text-sm'}>Please, describe what image do you want to generate!</h4>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 min-w-[300px]">
                    {/* Email Field */}
                    <FormField
                        control={form.control}
                        name="requestField"
                        render={({field}) => (
                            <motion.button whileHover={{scale: 1.2}}>
                            <FormItem>
                                <FormLabel className="text-sm font-medium text-gray-700">Email</FormLabel>
                                <FormControl>
                                    <Textarea
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        placeholder="Request Field"
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription className="text-sm text-gray-500">Enter your request to generate
                                    image</FormDescription>
                                <FormMessage className="text-red-500 text-sm mt-1"/>
                            </FormItem>
                            </motion.button>
                        )}
                    />

                    <SubmitButton requested={requested} text={'Submit'}/>
                </form>
            </Form>

            {
                <Card className="mt-4 w-full shadow-lg">
                    {
                        (
                            <CardHeader>
                                {
                                    imageBase64 ? (
                                            <img src={`data:image/jpeg;base64,${imageBase64}`}
                                                 alt={'generated image'}
                                                 className="w-full h-48 object-cover rounded-t-md"
                                            />
                                        ) :
                                        !requested ? <p>Waiting for your request!</p> : <p>Loading...</p>
                                }

                            </CardHeader>
                        )
                    }

                    <CardContent>
                        {
                            (
                                <>
                                    <CardTitle className="text-lg font-semibold pt-2">{ !requested ?
                                        <span>Please, type your request and submit!</span> :
                                        <div className={'flex justify-center'}>
                                            <ReloadIcon className="mr-2 h-7 w-7 animate-spin" />
                                        </div>
                                    }</CardTitle>
                                    <CardDescription className="text-sm text-gray-500">{alt}</CardDescription>
                                </>
                            )
                        }
                    </CardContent>
                </Card>
            }
        </div>
    </div>)
}

export default ImageGenerator;