import React, {useEffect, useState} from 'react';
import {Card, CardContent, CardFooter} from "../components/ui/card.tsx";
import {Button} from "../components/ui/button.tsx";
import {BookMarkedIcon} from "lucide-react";
import {IBooking} from "../types";
import {useParams} from "react-router-dom";
import {cancelBooking, getBookingById} from "../services/booking.service.ts";

const BookingPage: React.FC = () => {
    const {id} = useParams<{ id: string }>();
    const [booking, setBooking] = useState<IBooking>({
        firstName: '',
        lastName: '',
        _id: '0',
        date: undefined,
        createdAt: undefined,
        deletedAt: undefined,
    });
    const handleCancelBooking = async (id: string) => {
        console.log(`Cancel booking with id: ${id}`);
        const { booking: receivedBooking } = await cancelBooking(id);
        setBooking(receivedBooking);
    };

    const formatDate = (date: Date | undefined) => {
        return date && new Date(date).toLocaleDateString();
    };

    useEffect(() => {
        // @ts-ignore
        getBookingById(id).then(data => {
            setBooking(data);
        })
        console.log(id)
    }, [id]);

    return (
        <div className="mt-4">
            <h2 className={'py-4 font-bold'}>Booking with id {booking._id}</h2>
            <Card key={booking._id} className={'gap-4 border rounded-xl p-3 my-2'}>
                <CardContent className={'flex flex-row rounded-lg overflow-hidden relative'}>
                    <div className="w-20 h-20 bg-gray-200 flex-shrink-0">
                        {/* Example conditional rendering if you had images */}
                        <div className="flex items-center justify-center h-full">No image</div>
                    </div>
                    <div className={"flex flex-col p-2 items-center w-full"}>
                        <div className={'flex justify-between bg-gray-200 py-2 px-10 m-2 rounded min-w-[250px]'}>
                            <BookMarkedIcon/>{`${booking.firstName} / ${booking.lastName}`}</div>
                        <div>Booked for: {formatDate(booking.date)}</div>
                        <div>Slot created on: {formatDate(booking.createdAt)}</div>
                    </div>
                </CardContent>

                <CardFooter className={'flex justify-between'}>
                    <div>Status: {booking.isDeleted ? `Cancelled at ${formatDate(booking.deletedAt)}` : "Active"}</div>
                    {!booking.isDeleted && (
                        <div>
                            <Button size="sm" variant="destructive"
                                    onClick={() => handleCancelBooking(booking._id)}>Cancel Booking</Button>
                        </div>
                    )}
                </CardFooter>
            </Card>
        </div>
    );
};

export default BookingPage;
