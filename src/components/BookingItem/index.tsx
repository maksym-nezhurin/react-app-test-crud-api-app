import { IPreparedBooking } from "../Calendar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import {Button} from "../ui/button.tsx";
import {XIcon} from "lucide-react";
import {cn} from "../../lib/utils.ts";

interface IProps {
    booking: IPreparedBooking;
    onRemove: (id: string) => void
}

export const BookingItem = (props: IProps) => {
    const { booking, onRemove } = props;

    return (
        <Card className={cn('w-full max-w-md mx-auto my-2 bg-white shadow-md rounded-lg transition-transform transform', {
            ['hover:shadow-lg hover:scale-105 cursor-pointer']: !booking.isDeleted,
            ['cursor-not-allowed']: booking.isDeleted
        })}>
            <CardHeader>
                <CardTitle className="text-lg font-bold text-gray-800">
                    {booking.firstName} {booking.lastName}
                    <div className={'absolute right-1 top-1'}>
                        <Button
                            onClick={() => onRemove(booking._id)} // Callback function to handle removal
                            disabled={booking.isDeleted}
                            size={'sm'}
                            variant={'destructive'}
                            className={cn("flex items-center h-6 md:h-9 gap-1 text-white rounded-md p-1 md:px-3 md:py-2", {
                                ['focus:ring-2 focus:ring-red-500 focus:ring-offset-2 bg-red-600']: !booking.isDeleted
                            })}
                        >
                            <XIcon className="w-5 h-5" /> {/* Times icon */}
                        </Button>
                    </div>
                </CardTitle>
                <CardDescription className="text-gray-500">
                    Booking Date: {booking.dateISO}
                </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
                <p className="text-gray-600 text-sm">
                    {/* Optional extra information could go here */}
                    {booking.isDeleted || "No additional notes available."}
                </p>

                <p>{booking.isDeleted && "Booking is deleted!"}</p>
            </CardContent>
            <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 text-right">
                <Button disabled={booking.isDeleted} variant={'secondary'} className="w-full focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    View Details
                </Button>
            </div>
        </Card>
    );
};
