import HomePage from "../pages/Home.tsx";
import NewsPage from "../pages/News.tsx";
import ArticlePage from "../pages/Article.tsx";
import LoginPage from "../pages/Login.tsx";
import BookingPage from "../pages/Booking.tsx";
import NotFound from "../pages/NotFound.tsx";

interface PageBase {
    path: string;
    lable: string;
    hidden?: boolean;
    protected?: boolean;
}

interface IHomePage extends PageBase {
    component: typeof HomePage;
}

interface INewsPage extends PageBase {
    component: typeof NewsPage;
}

interface IArticlePage extends PageBase {
    component: typeof ArticlePage;
}

type Page = IHomePage | INewsPage | ILoginPage | IArticlePage;

// Define the type for the pages object
export const pages: Record<string, Page> = {
    home: {
        path: '/',
        lable: 'Home',
        component: HomePage,
        protected: true
    },

    news: {
        path: '/news',
        lable: 'News',
        component: NewsPage,
        protected: false
    },
    login: {
        path: '/login',
        lable: 'Login',
        component: LoginPage,
        hidden: true
    },
    booking: {
        path: '/booking',
        lable: 'Booking a tool',
        component: BookingPage,
        protected: true
    },
    articles: {
        path: '/articles/:id',
        lable: 'Articles',
        component: ArticlePage,
        hidden: true
    },
    notFound: {
        path: '*',
        label: '404 Not Found',
        component: NotFound,
        hidden: true,
    }
}