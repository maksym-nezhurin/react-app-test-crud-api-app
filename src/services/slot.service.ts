import apiService from "../utils/apiService.tsx";
import { ISlot } from "../types";
import {soonerNotify} from "../utils/notify.ts";
import {authStore} from "../stores/authStore.ts";
import moment from 'moment';

const apiUrl = import.meta.env.VITE_API_URL;
const API_URL = `${apiUrl}/api/slots/`;

const api = new apiService({baseURL: API_URL});

interface ISlotResponse {
    message: string;
    slots: ISlot[]
}

export const getAllAvailableSlots = async () => {
    const { data } = await api.get<ISlotResponse>('/', {}, {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json'
        }
    });

    console.log(data, 'sdsdds')
    return data.slots
}

export const getAvailableSlotByDate = async (date) => {
    if (!date) {
        return [];
    }

    const { data } = await api.get<ISlotResponse>(`/${date}`, {}, {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json'
        }
    })

    soonerNotify(data.message, 'warning');
    return data.slots.map((slot) => ({
        ...slot,
        time: moment(slot.date).format('hh:mm A')
    }));
}

export const createNewSlot = async ({date, timeSlot}) => {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const datee = moment.utc(date).add(1, 'days').format('YYYY-MM-DD');
    const { userId } = authStore;
    const { data } = await api.post<{ slot: ISlot}>('/', {
        date:  datee,
        time: timeSlot,
        author: userId,
        timezone
    }, {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const { slot } = data;

    return {
        ...slot,
        time: moment(slot.date).local().format('HH:mm A'),
        date: moment(slot.date).local().format('YYYY-MM-DD')
    };
}
