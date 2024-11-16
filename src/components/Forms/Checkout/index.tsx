import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import ApiService from "../../../utils/apiService.tsx";
import {useState} from "react";
import {CheckoutFormValues, checkoutSchema} from "../../../schemas/checkoutSchemas.ts";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "../../ui/form.tsx";
import {Input} from "../../ui/input.tsx";
import {SubmitButton} from "../SubmitButton";
import {Calendar} from "../../ui/calendar.tsx";
import {soonerNotify} from "../../../utils/notify.ts";

const apiUrl = import.meta.env.VITE_API_URL;

interface ICheckoutProps {
    onSuccess: (data: string) => void;
    orderId: string,
    editMode: boolean
}

const CheckoutFormInner = ({ editMode, orderId, onSuccess }: ICheckoutProps) => {
    const [requested, setRequested] = useState(false);
    const apiService = new ApiService({
        baseURL: `${apiUrl}/api/forms/checkout`,
        multipartFormData: true
    });
    const form = useForm<CheckoutFormValues>({
        resolver: zodResolver(checkoutSchema),
        defaultValues: {
            fullName: "",
            email: "",
            address: "",
            city: "",
            postalCode: "",
            country: "",
        },
    });
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());

    const handleSubmit = async (formData: CheckoutFormValues) => {
        try {
            setRequested(true);

            // Submit data to your server
            const { data } = await apiService.post<{ message: string; id: string; }>("/address-details", {
                ...formData,
                orderId
            });

            if (data) {
                onSuccess(data?.id);
                soonerNotify(data.message)
            }
        } catch (err) {
            console.error("Error:", err);
        } finally {
            form.reset();
            setRequested(false);
        }
    };

    return (
        <div className={'mb-2'}>
            <h3 className="font-bold mb-2 mt-4">Checkout</h3>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 min-w-[100px]">
                    {/* Calendar Field */}
                    <FormField
                        control={form.control}
                        name="date"
                        render={({field}) => (
                            <FormItem className="relative">
                                <FormLabel>Select Date:</FormLabel>
                                <FormControl className={'flex justify-center'}>
                                    <Calendar
                                        mode={"single"}
                                        selected={selectedDate}
                                        onSelect={(date) => {
                                            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                                            date && setSelectedDate(date);
                                            field.onChange(date?.toISOString() || "");
                                        }}
                                        disabled={editMode}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    {/* Full Name */}
                    <FormField
                        control={form.control}
                        disabled={requested || editMode}
                        name="fullName"
                        render={({field}) => (
                            <FormItem className="relative flex items-center">
                                <FormLabel className="text-sm font-medium text-gray-700 mr-2 w-[120px] text-left">Full
                                    Name:</FormLabel>
                                <FormControl>
                                    <Input
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        placeholder="Full Name"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage className="absolute text-red-500 text-sm mt-1 bottom-[-20px] left-0"/>
                            </FormItem>
                        )}
                    />

                    {/* Email */}
                    <FormField
                        control={form.control}
                        disabled={requested || editMode}
                        name="email"
                        render={({field}) => (
                            <FormItem className="relative flex items-center">
                                <FormLabel
                                    className="text-sm font-medium text-gray-700 mr-2 w-[120px] text-left">Email:</FormLabel>
                                <FormControl>
                                    <Input
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        placeholder="Email"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage className="absolute text-red-500 text-sm mt-1 bottom-[-20px] left-0"/>
                            </FormItem>
                        )}
                    />

                    {/* Address */}
                    <FormField
                        control={form.control}
                        disabled={requested || editMode}
                        name="address"
                        render={({field}) => (
                            <FormItem className="relative flex items-center">
                                <FormLabel
                                    className="text-sm font-medium text-gray-700 mr-2 w-[120px] text-left">Address:</FormLabel>
                                <FormControl>
                                    <Input
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        placeholder="Address"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage className="absolute text-red-500 text-sm mt-1 bottom-[-20px] left-0"/>
                            </FormItem>
                        )}
                    />

                    {/* City */}
                    <FormField
                        control={form.control}
                        disabled={requested || editMode}
                        name="city"
                        render={({field}) => (
                            <FormItem className="relative flex items-center">
                                <FormLabel
                                    className="text-sm font-medium text-gray-700 mr-2 w-[120px] text-left">City:</FormLabel>
                                <FormControl>
                                    <Input
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        placeholder="City"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage className="absolute text-red-500 text-sm mt-1 bottom-[-20px] left-0"/>
                            </FormItem>
                        )}
                    />

                    {/* postalCode */}
                    <FormField
                        control={form.control}
                        disabled={requested || editMode}
                        name="postalCode"
                        render={({field}) => (
                            <FormItem className="relative flex items-center">
                                <FormLabel className="text-sm font-medium text-gray-700 mr-2 w-[120px] text-left">Postal
                                    code:</FormLabel>
                                <FormControl>
                                    <Input
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        placeholder="Postal code"
                                        minLength={5}
                                        type={'number'}
                                        maxLength={5}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage className="absolute text-red-500 text-sm mt-1 bottom-[-20px] left-0"/>
                            </FormItem>
                        )}
                    />

                    {/* country */}
                    <FormField
                        control={form.control}
                        disabled={requested || editMode}
                        name="country"
                        render={({field}) => (
                            <FormItem className="relative flex items-center">
                                <FormLabel
                                    className="text-sm font-medium text-gray-700 mr-2 w-[120px] text-left">Country:</FormLabel>
                                <FormControl>
                                    <Input
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        placeholder="country"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage className="absolute text-red-500 text-sm mt-1 bottom-[-20px] left-0"/>
                            </FormItem>
                        )}
                    />

                    <SubmitButton requested={requested} text="Submit"/>
                </form>
            </Form>
        </div>
    );
};

export {CheckoutFormInner};