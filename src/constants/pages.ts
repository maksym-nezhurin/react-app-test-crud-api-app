import Home from "../pages/Home.tsx";
import News from "../pages/News.tsx";
import Article from "../pages/Article.tsx";
import LoginPage from "../pages/LoginPage.tsx";
import BookingPage from "../pages/Booking.tsx";

interface PageBase {
    path: string;
    lable: string;
    hidden?: boolean;
    protected?: boolean;
}

interface HomePage extends PageBase {
    component: typeof Home;
}

interface NewsPage extends PageBase {
    component: typeof News;
}

interface LoginPage extends PageBase {
    component: typeof LoginPage;
}

interface ArticlePage extends PageBase {
    component: typeof Article;
    // If Article expects specific props, define them here
}

type Page = HomePage | NewsPage | LoginPage | ArticlePage;

// Define the type for the pages object
export const pages: Record<string, Page> = {
    home: {
        path: '/',
        lable: 'Home',
        component: Home
    },
    news: {
        path: '/news',
        lable: 'News',
        component: News
    },
    login: {
        path: '/login',
        lable: 'Login',
        component: LoginPage,
        hidden: true
    },
    booking: {
        path: '/booking',
        lable: 'Book a tool',
        component: BookingPage,
    },
    articles: {
        path: '/articles/:id',
        lable: 'Articles',
        component: Article,
        hidden: true
    }
}