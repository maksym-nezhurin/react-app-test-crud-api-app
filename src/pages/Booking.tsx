import React from 'react';
import {CalendarSimple} from "../components/Calendar";

const BookingPage: React.FC = () => {
    return (<div className={"grid h-full grid-rows-[auto_1fr_auto]"}>
        <header
            className="flex-grow bg-gray-100 rounded-xl p-3 flex items-center justify-center justify-self-center px-8 mb-2">
            <div className="text-center">
                <h1 className="text-2xl font-bold mb-4">Booking</h1>
                <p className="mb-6">Please, select the date to book an appointment:</p>
            </div>
        </header>

        <CalendarSimple/>
    </div>)
}

export default BookingPage;