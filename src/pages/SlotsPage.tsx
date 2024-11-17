import React, {useState} from "react";
import {motion} from "framer-motion";
import SlotForm from "../components/Forms/SlotForm";

const headerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
};

const footerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
};

const SlotsPage: React.FC  = () => {
    return <motion.div
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{duration: 1}}
        className="min-h-[90vh] flex flex-col"
    >
        <motion.header
            initial="hidden"
            animate="visible"
            transition={{duration: 0.8, ease: "easeOut"}}
            variants={headerVariants}
            className="flex-grow bg-gray-100 rounded-xl p-3 flex items-center justify-center"
        >
            <div className="text-center">
                <h1 className="text-2xl font-bold mb-4 text-brandRed">Welcome to a system of creating Slots </h1>
                <p className="mb-6">The easiest way to create slots for ability to book an appointment or service.</p>
            </div>
        </motion.header>

        <main>
            <div className="mt-4 mb-6">
                <div>
                    <h2>Please select the time and date</h2>

                    <SlotForm />
                </div>
            </div>

        </main>

        <section className="container mx-auto pt-6 pb-4">

        </section>

        <motion.footer
            initial="hidden"
            animate="visible"
            transition={{duration: 0.8, ease: "easeOut"}}
            variants={footerVariants}
            className="bg-gray-500 text-white p-4"
        >
            <div className="container mx-auto text-center">
                <p>Copyright © 2023 Your Company</p>
            </div>
        </motion.footer>
    </motion.div>
}

export default SlotsPage;