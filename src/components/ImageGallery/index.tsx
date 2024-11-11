// @ts-nocheck
import React, { useEffect, useState, useRef, useCallback } from 'react';
import Gallery from 'react-photo-gallery';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Share from 'yet-another-react-lightbox/plugins/share';
import Slideshow from 'yet-another-react-lightbox/plugins/slideshow';
import AxiosWrapper from "../../utils/fetchWrapper.tsx";
import {IPhoto, ISplashImage} from "../../types";

const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY as string;

interface IProps {
    query: string
}

interface IResponse {
    results: ISplashImage[];
    total: number;
    total_pages: number;
}

interface UnsplashRequestParams {
    query: string;
    per_page: number;
    page: number;
}
const UnsplashGallery: React.FC<IProps> = (props) => {
    const { query = 'cats' } = props;
    const axiosWrapper = new AxiosWrapper({
        baseURL: `https://api.unsplash.com/search/photos`,
    });

    axiosWrapper.setHeaders({
        Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
    })

    const [photos, setPhotos] = useState<IPhoto[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [photoIndex, setPhotoIndex] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [hasMore] = useState(true);
    const observerRef = useRef<HTMLDivElement | null>(null);
    let prevPage = 0;

    useEffect(() => {
        setPhotos([]);
        setPage(1);
    }, [query]);

    const fetchImages = useCallback(async () => {
        const params: UnsplashRequestParams = {
            query: query,
            per_page: 10,
            page: page
        };

        setLoading(true);
        try {

            if (prevPage === page)
                return null;
            prevPage++;
            const response = await axiosWrapper.get<IResponse>('',
                params as never) || [];
            if (!response) {
                throw new Error('No data returned from API');
            }

            const { results, total } = response || {};

            const newPhotos: IPhoto[] = results.map((image: ISplashImage) => ({
                src: image.urls.regular,
                width: image.width,
                height: image.height,
                alt: image.alt_description || 'Unsplash Image',
            }));

            setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);

            // if (newPhotos.length < 10) setHasMore(false); // Check if fewer items returned to end scroll
        } catch (err) {
            setError('Failed to load images. Please try again later.');
            console.error('Error fetching images:', err);
        } finally {
            setLoading(false);
        }

    }, [page]);

    useEffect(() => {
        if (hasMore) {
            fetchImages().then();
        }
    }, [hasMore, page]);

    const loadMorePhotos = (entries: IntersectionObserverEntry[]) => {
        const [entry] = entries;

        if (entry.isIntersecting && hasMore && !loading) {
            setPage((prevPage) => prevPage + 1); // Increment page to load more photos
        }
    };

    useEffect(() => {
        const observer = new IntersectionObserver(loadMorePhotos, {
            root: null,
            rootMargin: '100px',
            threshold: 1.0,
        });

        if (observerRef.current) observer.observe(observerRef.current);

        return () => observer.disconnect();
    }, []);

    const openLightbox = (index: number) => {
        setPhotoIndex(index);
        setIsOpen(true);
    };

    return (
        <div className="p-4">
            {error && <p>{error}</p>}

            <Gallery
                direction={'row'} // row | column
                photos={photos}
                onClick={(event: never, { index }) => openLightbox(index)}
            />

            {isOpen && (
                <Lightbox
                    open={isOpen}
                    close={() => setIsOpen(false)}
                    slides={photos.map((photo) => ({ src: photo.src }))}
                    index={photoIndex}
                    onIndexChange={setPhotoIndex}
                    plugins={[Zoom, Share, Slideshow]}
                />
            )}

            {loading && <p>Loading more photos...</p>}
            <div ref={observerRef} style={{ height: '100px' }} />
        </div>
    );
};

export default UnsplashGallery;
