import React from 'react';
import {CalendarSimple} from "../components/Calendar";

interface PageProps {
    setToken: (token: string) => void;
}

const BookingPage: React.FC<PageProps> = () => {
    return (<>
        <h1>Booking</h1>
        <p className={'my-4'}>Please, select the date to book an appointment:</p>

        <CalendarSimple />
    </>)
}

export default BookingPage;