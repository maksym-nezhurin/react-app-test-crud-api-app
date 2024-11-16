import apiService from "../utils/apiService.tsx";
import { ISlot } from "../types";

const apiUrl = import.meta.env.VITE_API_URL;
const API_URL = `${apiUrl}/api/slots/`;

const api = new apiService({baseURL: API_URL});

interface ISlotResponse {
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
    return data.slots;
}
