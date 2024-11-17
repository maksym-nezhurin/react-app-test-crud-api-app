import React from 'react';

import Link from "../components/Link";
import {pages} from "../constants/pages.tsx";
import {Button} from "../components/ui/button.tsx";
import {useNavigate} from "react-router-dom";
import { motion } from "framer-motion";

const headerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
};

const listVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.3,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
};

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

const footerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
};

const Home: React.FC = () => {
    const navigate = useNavigate();

    return (
        <motion.div
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
                    <h1 className="text-2xl font-bold mb-4 text-brandRed">Welcome to Book&Look</h1>
                    <p className="mb-6">The easiest way to book appointments and explore creative images.</p>
                    <Link to={pages.bookings.path} variant={'primary'}>
                        Book an Appointment
                    </Link>
                </div>
            </motion.header>
            {/*</header>*/}

            <main>
                <div className="mt-4 mb-6">
                    <h4 className="font-extrabold my-6 text-sm">
                        There is the app that allows to improve your skill in a
                        way to be opensource functionality!
                    </h4>

                    <motion.dl
                        initial="hidden"
                        animate="visible"
                        variants={listVariants}
                        className="bg-gray-100 p-4 rounded-lg shadow-md"
                    >
                        <motion.dt className="font-semibold text-lg text-gray-800">
                            At this application you can:
                        </motion.dt>
                        {[
                            {text: `Read a latest news "${pages.news.label}"`, path: pages.news.path},
                            {text: `Look, and create "${pages.articles.label}"`, path: pages.articles.path},
                            {text: `Book an appointment using "${pages.booking.label}"`, path: pages.bookings.path},
                            {text: `Looking for an image in a "${pages.gallery.label}"`, path: pages.gallery.path},
                        ].map(({text, path}, index) => (
                            <motion.dd key={index} variants={itemVariants} className="text-base text-gray-600 ml-4">
                                <Link to={path} variant={'secondary'}>{text}</Link>
                            </motion.dd>
                        ))}
                    </motion.dl>
                </div>

            </main>

            <section className="container mx-auto pt-6 pb-4">
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    initial="hidden"
                    animate="visible"
                    transition={{staggerChildren: 0.2}}
                >
                    <motion.div variants={cardVariants} className="bg-white shadow-md rounded-lg p-4">
                        <h3 className="font-semibold text-lg">Image Search</h3>
                        <p>Explore a wide array of images effortlessly.</p>
                        <Button variant={'secondary'} onClick={() => navigate(pages.gallery.path)}>
                            Search Images
                        </Button>
                    </motion.div>
                    <motion.div variants={cardVariants} className="bg-white shadow-md rounded-lg p-4">
                        <h3 className="font-semibold text-lg">Generate Image</h3>
                        <p>Create custom images with AI-driven tools.</p>
                        <Button variant={'ghost'} onClick={() => navigate(pages.aigenerator.path)}>
                            Generate Images
                        </Button>
                    </motion.div>
                </motion.div>
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
    );
};

export default Home;
