import {z} from "zod";
import AxiosWrapper from "../../../utils/fetchWrapper.tsx";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {SubmitButton} from "../SubmitButton";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "../../ui/form.tsx";
import {Input} from "../../ui/input.tsx";
import {useState} from "react";
import {IBooking} from "../../../types";
import { AnimatePresence, motion } from 'framer-motion';

const formSchema = z.object({
    firstname: z.string().min(3, {
        message: "Firstname must have at least 3 symbols"
    }),
    lastname: z.string().min(4, {
        message: "Lastname must have at least 4 symbols"
    }),
})

interface FormInput {
    firstname: string;
    lastname: string;
}

const apiUrl = import.meta.env.VITE_API_URL;

interface IBookingResponse {
    booking: IBooking,
    message: string
}

interface IProps {
    slotId: string
    onSuccess: (data: IBooking) => void
}

export const BookingForm = (props: IProps) => {
    const { slotId, onSuccess } = props;
    const [requested, setRequested] = useState(false);
    const axiosWrapper = new AxiosWrapper({baseURL: `${apiUrl}/api/forms/booking`});
    const form = useForm({
        resolver: zodResolver(formSchema), // Apply zod resolver with schema
        defaultValues: {
            firstname: "",
            lastname: ""
        },
    });

    const handleSubmit = async ({firstname, lastname}: FormInput) => {
        try {
            setRequested(true);
            const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            const {data} = await axiosWrapper.post<IBookingResponse>(`${apiUrl}/api/forms/booking`, {
                firstName: firstname,
                lastName: lastname,
                timezone: timezone,
                slotId
            });

            if (data.booking) {
                onSuccess(data.booking);
            }
        } catch (err) {
            console.log('Error:', err);
        } finally {
            form.reset();
            setRequested(false);
        }
    };

    return <div>
        <h3 className={'font-bold mb-2 mt-4'}>Please, fill all fields!</h3>
        <AnimatePresence>
            <motion.button whileHover={{scale: 1.2}}>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 min-w-[100px]">
                        <FormField
                            control={form.control}
                            disabled={requested}
                            name="firstname"
                            render={({field}) => (
                                <FormItem className="relative">
                                    <FormLabel className="text-sm font-medium text-gray-700">First name:</FormLabel>
                                    <FormControl>
                                        <Input
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            placeholder="First name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription className="text-sm text-gray-500">Type your name</FormDescription>

                                    {/* Absolute positioning for FormMessage */}
                                    <FormMessage className="absolute text-red-500 text-sm mt-1 bottom-[-20px] left-0"/>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            disabled={requested}
                            name="lastname"
                            render={({field}) => (
                                <FormItem className='relative'>
                                    <FormLabel className="text-sm font-medium text-gray-700">Last name:</FormLabel>
                                    <FormControl>
                                        <Input
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            placeholder="Last name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription className="text-sm text-gray-500">Type your last name</FormDescription>
                                    <FormMessage className="absolute text-red-500 text-sm mt-1 bottom-[-20px] left-0"/>
                                </FormItem>
                            )}
                        />

                        <SubmitButton requested={requested} text={'Submit'}/>
                    </form>
                </Form>
            </motion.button>
        </AnimatePresence>
    </div>
}