import React from 'react';
import { CalendarSimple } from "../components/Calendar";
import { AnimatePresence, motion } from 'framer-motion';

const BookingsPage: React.FC = () => {
    return (
        <AnimatePresence>
            {
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: -30 }} // Start smaller and slightly above
                    animate={{ opacity: 1, scale: 1, y: 0 }} // Grow to full size and center position
                    exit={{ opacity: 0, scale: 0.9, y: 30 }} // Shrink slightly and move down on exit
                    transition={{ duration: 0.6, ease: "easeInOut" }} // Smooth transition
                    className="grid h-full grid-rows-[auto_1fr_auto]"
                >
                    <header
                        className="flex-grow bg-gray-100 rounded-xl p-3 flex items-center justify-center justify-self-center px-8 mb-2"
                    >
                        <motion.div
                            initial={{ opacity: 0, x: -50 }} // Slide in from the left
                            animate={{ opacity: 1, x: 0 }} // Slide into position
                            transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
                            className="text-center"
                        >
                            <h1 className="text-2xl font-bold mb-4 text-brandRed">Booking</h1>
                            <p className="mb-6">Please, select the date to book an appointment:</p>
                        </motion.div>
                    </header>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }} // Start smaller
                        animate={{ opacity: 1, scale: 1 }} // Grow to full size
                        transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }} // Slight delay for staggered effect
                    >
                        <CalendarSimple />
                    </motion.div>
                </motion.div>
            }
        </AnimatePresence>
    );
};

export default BookingsPage;
