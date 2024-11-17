import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "../../ui/form.tsx";
import {Calendar} from "../../ui/calendar.tsx";
import {Input} from "../../ui/input.tsx";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useEffect, useState} from "react";
import {slotSchema, SlotFormValues} from "../../../schemas/slotSchema.ts";
import {CheckoutFormValues} from "../../../schemas/checkoutSchemas.ts";
import TimePicker from "../../TimePicker";
import {SubmitButton} from "../SubmitButton";
import {createNewSlot, getAvailableSlotByDate} from "../../../services/slot.service.ts";
import moment from "moment";
import {ISlot} from "../../../types";
import {cn} from "../../../lib/utils.ts";
import {AlertOctagon, Tag} from "lucide-react";

const formatDate = (date: Date): string => moment(date).format('YYYY-MM-DD');

const SlotForm = () => {
    const [requested, setRequested] = useState(false);
    const form = useForm<SlotFormValues>({
        resolver: zodResolver(slotSchema),
        defaultValues: {
            author: "meedsd",
            date: (Date.now()).toLocaleString(),
            timeSlot: ""
        },
    });
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [slots, setSlots] = useState<ISlot[]>([]);

    useEffect(() => {

    }, []);

    useEffect(() => {
        getAvailableSlotByDate(selectedDate).then(receivedSlots => {
            console.log('slots', receivedSlots);
            setSlots(receivedSlots);
        })
    }, [selectedDate]);

    const handleSubmit = async (data: CheckoutFormValues) => {
        try {
            console.log('submit!')
            setRequested(true);
            console.log('formData', data);

            createNewSlot(data).then(slot => {
                console.log('new -> slot', slot)
            })

            form.reset();
        } catch (err) {
            console.error("Error:", err);
        } finally {
            form.reset();
            setRequested(false);
        }
    };

    return (<div className="mb-2 grid grid-cols-2">

        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 min-w-[100px]">
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
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="timeSlot"
                    render={({field}) => (
                        <FormItem className="relative flex items-center justify-center">
                            <FormLabel className="text-sm font-medium text-gray-700 mr-2 w-[120px] text-left">Time:</FormLabel>
                            <FormControl>
                                <TimePicker
                                    onSelect={(time: string) => {
                                        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                                        // time && setSelectedTime(time);
                                        field.onChange(time);
                                    }}
                                />
                            </FormControl>
                            <FormMessage className="absolute text-red-500 text-sm mt-1 bottom-[-20px] left-0"/>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="author"
                    render={({ field }) => (
                        <FormItem className="relative" hidden={true}>
                            <FormControl>
                                <Input type="text" {...field} placeholder="Author" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <SubmitButton requested={requested} text="Create Timeslot" />
            </form>
        </Form>

        <div>
            <h3 className={'text-center w-full'}>Slots:</h3>

            {
                slots.length ? slots.map(slot => <div key={slot.time} className={cn('flex justify-between rounded-xl bg-gray-600 text-white my-2 px-6 py-2', {
                    ['bg-red-300 text-red-900']: slot.isBooked
                })}>
                    {slot.time}
                    { slot.isBooked ? <Tag /> : <AlertOctagon /> }
                </div>) : <div>We dont have any time slots for this date</div>
            }
        </div>
    </div>)
}

export default SlotForm;