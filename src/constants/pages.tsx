import HomePage from "../pages/Home.tsx";
import NewsPage from "../pages/News.tsx";
import ArticlePage from "../pages/Article.tsx";
import AuthPage from "../pages/AuthPage.tsx";
import BookingPage from "../pages/Booking.tsx";
import NotFound from "../pages/NotFound.tsx";
import GalleryPage from "../pages/Gallery.tsx";
import ArticlesPage from "../pages/Articles.tsx";
import {AIGeneratorPage} from "../pages/AIGeneratorPage.tsx";

interface PageBase {
    path: string;
    label: string;
    hidden?: boolean;
    protected?: boolean;
}

interface IHomePage extends PageBase {
    component: typeof HomePage;
}

interface INewsPage extends PageBase {
    component: typeof NewsPage;
}

interface IAuthPage extends PageBase {
    component: typeof AuthPage;
}

interface IGalleryPage extends PageBase {
    component: typeof GalleryPage;
}

interface IArticlesPage extends PageBase {
    component: typeof ArticlesPage;
}

interface IBookingPage extends PageBase {
    component: typeof BookingPage;
}
interface IArticlePage extends PageBase {
    component: typeof ArticlePage;
}

type Page = IHomePage | INewsPage | IAuthPage | IArticlePage | IGalleryPage | IBookingPage | IArticlesPage;

// Define the type for the pages object
export const pages: Record<string, Page> = {
    home: {
        path: '/',
        label: 'Home',
        component: HomePage,
        protected: true
    },
    articles: {
        path: '/articles',
        label: 'Articles',
        component: ArticlesPage
    },
    aigenerator: {
        path: '/ai-generator',
        label: 'AI Image Generator',
        component: AIGeneratorPage
    },
    news: {
        path: '/news',
        label: 'News',
        component: NewsPage,
        protected: false
    },
    auth: {
        path: '/login',
        label: 'Login',
        component: AuthPage,
        hidden: true
    },
    booking: {
        path: '/booking',
        label: 'Booking a tool',
        component: BookingPage,
        protected: true
    },
    article: {
        path: '/articles/:id',
        label: 'Articles',
        component: ArticlePage,
        hidden: true
    },
    gallery: {
        path: '/gallery',
        label: 'Gallery',
        component: GalleryPage
    },
    notFound: {
        path: '*',
        label: '404 Not Found',
        component: NotFound,
        hidden: true,
    }
}