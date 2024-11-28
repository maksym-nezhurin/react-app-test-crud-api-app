import apiService from "../utils/apiService.tsx";
import {soonerNotify} from "../utils/notify.ts";
import {IBooking} from "../types";
import {format} from "date-fns";
import moment from "moment/moment";

const apiUrl = import.meta.env.VITE_API_URL;
const API_URL = `${apiUrl}/api/forms/booking/`;

interface IBookingResponse {
    bookings: IBooking[]
}

interface IBookingWithDate extends IBooking{
    dateISO: string
}

type IBookingInput = Pick<IBooking, 'firstName' | 'lastName'> & {
    slotId: string;
};

const formatDate = (date: Date): string => moment(date).format('YYYY-MM-DD');

const prepareBooking = (booking: IBooking):IBookingWithDate => {
    // @ts-ignore
    const formattedDate = format(new Date(booking.date), "yyyy-MM-dd hh:mm a");
    return {
        ...booking,
        dateISO: formattedDate
    };
};

const api = new apiService({baseURL: API_URL});

export const getBookingsByDate = async (selectedDate: Date) => {
    const dateStr = formatDate(selectedDate);
    const { data } = await api.get<IBookingResponse>(`${dateStr}`, {}, {
        // withCredentials: true,
        // headers: {
        //     'Content-Type': 'application/json'
        // }
    });
    const bookingsNew = data.bookings.map((b: IBooking) => prepareBooking(b));
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    bookingsNew.length && soonerNotify(`You are successfully received booking for ${dateStr} date!`, 'success')
    return bookingsNew;
}

export const getBookingById = async (id: string) => {
    const { data } = await api.get<{booking: IBooking}>(`/item/${id}`, {}, {
        // withCredentials: true,
        // headers: {
        //     'Content-Type': 'application/json'
        // }
    });

    return data.booking;
}

export const createBooking = async ({ firstName, lastName, slotId }: IBookingInput) => {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const { data } = await api.post<{booking: IBooking}>(`/`, {
        firstName,
        lastName,
        slotId,
        timezone
    });

    soonerNotify(`Slot ${slotId} already booked for ${firstName}/${lastName} !`)

    return data.booking;
};

export const cancelBooking = async (id: string) => {
    const { data } = await api.delete<{booking: IBooking}>(`/${id}`, {});

    return data;
}