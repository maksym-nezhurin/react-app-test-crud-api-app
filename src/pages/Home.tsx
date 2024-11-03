import React from 'react';

import Link from "../components/Link";
import {pages} from "../constants/pages.tsx";
import {Button} from "../components/ui/button.tsx";
import {useNavigate} from "react-router-dom";

const Home: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className={'min-h-[90vh] flex flex-col'}>
            <header className="flex-grow bg-gray-100 rounded-xl p-3 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Welcome to Book&Look</h1>
                    <p className="mb-6">The easiest way to book appointments and explore creative images.</p>
                    <Link to={pages.booking.path} variant={'primary'}>
                        Book an Appointment
                    </Link>
                </div>
            </header>

            <main>
                <div className="mt-4 mb-6">
                    <h4 className="font-extrabold my-6 text-sm">
                        There is the app that allows to improve your skill in a
                        way to be opensource functionality!
                    </h4>

                    <dl className="bg-gray-100 p-4 rounded-lg shadow-md">
                        <dt className="font-semibold text-lg text-gray-800">At this application you can:</dt>

                        <dd className="text-base text-gray-600 ml-4">
                            <Link to={pages.news.path} variant={'secondary'}>
                                Read a latest news "{pages.news.label}"</Link>
                        </dd>

                        <dd className="text-base text-gray-600 ml-4">
                            <Link to={pages.articles.path} variant={'secondary'}>Look, and
                                create "{pages.articles.label}"</Link>
                        </dd>

                        <dd className="text-base text-gray-600 ml-4">
                            <Link to={pages.booking.path} variant={'secondary'}>
                                Book an appointment using "{pages.booking.label}"</Link>
                        </dd>

                        <dd className="text-base text-gray-600 ml-4">
                            <Link to={pages.gallery.path} variant={'secondary'}>
                                Looking for an image in a "{pages.gallery.label}"</Link>
                        </dd>
                    </dl>
                </div>

            </main>

            <section className="container mx-auto p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white shadow-md rounded-lg p-4">
                        <h3 className="font-semibold text-lg">Image Search</h3>
                        <p>Explore a wide array of images effortlessly.</p>
                        <Button variant={'secondary'} onClick={() => navigate(pages.gallery.path)}>
                            Search Images
                        </Button>
                    </div>
                    <div className="bg-white shadow-md rounded-lg p-4">
                        <h3 className="font-semibold text-lg">Generate Image</h3>
                        <p>Create custom images with AI-driven tools.</p>
                        <Button variant={'ghost'} onClick={() => navigate(pages.aigenerator.path)}>
                            Generate Images
                        </Button>
                    </div>
                </div>
            </section>

            <footer className="bg-gray-500 text-white p-4">
                <div className="container mx-auto text-center">
                    <p>Copyright © 2023 Your Company</p>
                </div>
            </footer>
        </div>

    );
};

export default Home;
