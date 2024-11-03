// @ts-nocheck
import {Fragment, useCallback, useEffect, useMemo, useState} from "react";
import moment from 'moment';
import {Calendar} from "../ui/calendar";
import type {IBooking} from "../../types";
import {BookingForm} from "../Forms/Booking";
import {format} from 'date-fns';
import AxiosWrapper from "../../utils/fetchWrapper.tsx";
import {BookingItem} from "../BookingItem";
import {soonerNotify} from "../../utils/notify.ts";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "../ui/select.tsx";
import {Skeleton} from "../ui/skeleton.tsx";

type Slots = {
    [key: string]: {
        time: string,
        _id: string,
        isBooked: boolean
    }[];
};
const apiUrl = import.meta.env.VITE_API_URL;

export interface IPreparedBooking extends IBooking {
    dateISO: string;
}

interface BookingResponse {
    bookings: IBooking[]
}

function SkeletonCard() {
    return (
        <div className="flex flex-col space-y-3 w-full">
            <Skeleton className="h-[125px] w-full rounded-xl" />
            <div className="space-y-2">
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-4 w-[200px]" />
            </div>
        </div>
    )
}

export function CalendarSimple() {
    const axiosWrapper = new AxiosWrapper({baseURL: `${apiUrl}/api/forms/booking`});
    const [requested, setRequested] = useState<boolean>(false);
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [availableSlots, setAvailableSlots] = useState<Slots | []>([]);
    const [selectedSlot, setSelectedSlotId] = useState<string>('');
    const [bookings, setBookings] = useState<IPreparedBooking[]>([]);
    const formatDate = (date: Date): string => moment(date).format('YYYY-MM-DD');
    const dateStr = formatDate(selectedDate);

    const handleDateChange = (date: Date | undefined) => {
        if (date) setSelectedDate(date);
        setSelectedSlotId('');
    };

    const prepareBooking = useCallback((booking: IBooking) => {
        const formattedDate = format(new Date(booking.date), "yyyy-MM-dd hh:mm a");
        return {
            ...booking,
            dateISO: formattedDate
        };
    }, []);

    useEffect(() => {
        const getBookingsByDate = async () => {
            setRequested(true);
            const { data } = await axiosWrapper.get<BookingResponse>(`${apiUrl}/api/forms/booking/${formatDate(selectedDate)}`);
            const bookingsNew = data.bookings.map((b: IBooking) => prepareBooking(b));

            setBookings(bookingsNew);
            setRequested(false);
        };

        getBookingsByDate();
    }, [selectedDate]);

    useEffect(() => {
        const getAllAvailableSlots = async () => {
            return await axiosWrapper.get(`${apiUrl}/api/slots/`);
        }

        getAllAvailableSlots().then(slots => {
            setSelectedDate(new Date(Object.keys(slots)[0]));

            setAvailableSlots(slots);
        })
    }, []);

    const bookTimeSlot = async (data: IBooking) => {
        if (!selectedSlot) return;

        setBookings((prev) => [...prev, prepareBooking(data)]);
        setSelectedSlotId('');

        const newSlots = availableSlots[dateStr].map((slot) => {
            if( slot._id === selectedSlot) {
                slot.isBooked = true;
            }
            return slot;
        });

        soonerNotify(`Booking for ${data.firstName} / ${data.lastName} successfully created!`, 'info');
        setAvailableSlots(prev => ({...prev, [dateStr]: newSlots}));
    };

    const renderTimeSlots = () => {
        const slots = availableSlots[dateStr] || [];

        return slots.length > 0 ? (
            <div className="flex flex-col columns-1">
                <Select value={selectedSlot} onValueChange={(dat) => setSelectedSlotId(dat)}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Slot" />
                    </SelectTrigger>
                    <SelectContent>
                        {slots.map((slot) => <SelectItem key={slot._id} disabled={slot.isBooked} value={slot._id}>{slot.time}</SelectItem>)}
                    </SelectContent>
                </Select>
                {selectedSlot &&
                    <BookingForm slotId={selectedSlot} onSuccess={bookTimeSlot}/>}
            </div>
        ) : <p>No available time slots for this date.</p>;
    };

    const handleRemove = async (id: string) => {
        try {
            const {booking, message} = await axiosWrapper.delete<{booking: { slot: string}, message: string}>(`${apiUrl}/api/forms/booking/${id}`, {});

            setBookings((state) => {
                return [...state.map(item => {
                    if (item._id === id) {
                        item.isDeleted = true
                    }
                    return item;
                })]
            });

            const newSlots = availableSlots[dateStr].map((slot) => {
                if(slot._id === booking.slot) {
                    slot.isBooked = false;
                }
                return slot;
            });

            setAvailableSlots(prev => ({...prev, [dateStr]: newSlots}));
            // notify(message, 'warning');
            soonerNotify(message, 'warning');
        } catch (error) {
            console.error('Error deleting booking:', error);
        }
    };

    const renderBookings = () => {
        if (requested) {
            return (
                <div className="animate-pulse grid grid-cols-2 gap-3.5">
                    {[...Array(6)].map((_, i) => (
                        <SkeletonCard key={i} />
                    ))}
                </div>
            );
        }

        const bookingsBySelectedDate = bookings.filter((booking) => {
            const bookingDate = new Date(booking.date).toISOString().slice(0, 10);
            return bookingDate === formatDate(selectedDate);
        });

        return bookingsBySelectedDate?.length > 0 ? (
            <div className={'grid grid-cols-2 gap-3.5'}>
                {bookingsBySelectedDate.map((booking) => (
                    <Fragment key={booking._id}>
                        <BookingItem booking={booking} onRemove={handleRemove} />
                    </Fragment>
                ))}
            </div>
        ) : (
            <div>Nothing booked.</div>
        );
    };

    const matchDateRange = useMemo(() => {
        return Object.keys(availableSlots).map(key => new Date(key));
    }, [availableSlots]);

    const isDayDisabled = (date: Date) => {
        return !matchDateRange.some(availableDate =>
            date.getFullYear() === availableDate.getFullYear() &&
            date.getMonth() === availableDate.getMonth() &&
            date.getDate() === availableDate.getDate()
        );
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] lg:grid-cols-[1fr_4fr_150px] gap-4">
            <div>
                <Calendar
                    mode="single"
                    fromDate={new Date()}
                    disabled={isDayDisabled}
                    selected={selectedDate}
                    onSelect={handleDateChange}
                    className="rounded-md border flex justify-center"
                />
                <div className="border rounded-xl p-4 mt-3">
                    <h3 className="font-bold mb-2">Select time for the date {dateStr}:</h3>
                    <div>{renderTimeSlots()}</div>
                </div>
            </div>

            <div className="order-1 border rounded-xl p-2 lg:col-span-1">
                <div>
                    <h3 className="font-bold mb-2">Bookings:</h3>
                    <div className="overflow-y-auto max-h-[60vh] p-4">{renderBookings()}</div>
                </div>
            </div>

            <div className="border rounded-xl p-4 md:order-4 lg:order-2">
                <h3 className="font-bold mb-4">Info</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
            </div>
        </div>
    );
}
