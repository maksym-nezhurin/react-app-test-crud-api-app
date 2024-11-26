import HomePage from "../pages/Home.tsx";
import NewsPage from "../pages/NewsPage.tsx";
import ArticlePage from "../pages/ArticlePage.tsx";
import AuthPage from "../pages/AuthPage.tsx";
import BookingsPage from "../pages/Bookings.tsx";
import BookingPage from "../pages/BookingPage.tsx";
import NotFound from "../pages/NotFound.tsx";
import GalleryPage from "../pages/GalleryPage.tsx";
import ArticlesPage from "../pages/ArticlesPage.tsx";
import { AIGeneratorPage } from "../pages/AIGeneratorPage.tsx";
import BasketPage from "../pages/BasketPage.tsx";
import { ProductsPage } from "../pages/ProductsPage.tsx";
import ProfilePage from '../pages/ProfilePage.tsx';
import {
  Home,
  Inbox,
  Rss,
  Settings,
  Newspaper,
  StickyNote,
  Images,
  BookMarked,
  ShoppingBasket,
  PersonStanding,
  PackageSearch,
  Icon,
} from "lucide-react";

interface PageBase {
  path: string;
  label: string;
  hidden?: boolean;
  isProtected?: boolean;
  icon?: React.ElementType<React.ComponentProps<typeof Icon>>;
}

interface IHomePage extends PageBase {
  component: typeof HomePage;
}

interface INewsPage extends PageBase {
  component: typeof NewsPage;
}
interface IProfilePage extends PageBase {
  component: typeof ProfilePage;
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

interface IBookingsPage extends PageBase {
  component: typeof BookingsPage;
}

interface IBookingPage extends PageBase {
  component: typeof BookingPage;
}
interface IArticlePage extends PageBase {
  component: typeof ArticlePage;
}

type Page =
  | IHomePage
  | INewsPage
  | IAuthPage
  | IArticlePage
  | IGalleryPage
  | IBookingsPage
  | IBookingPage
  | IProfilePage
  | IArticlesPage;

// Define the type for the pages object
export const pages: Record<string, Page> = {
  home: {
    path: "/",
    label: "Home",
    icon: Home,
    component: HomePage,
    isProtected: true,
  },
  articles: {
    path: "/articles",
    label: "Articles",
    icon: Rss,
    component: ArticlesPage,
    hidden: true,
    isProtected: true,
  },
  article: {
    path: "/articles/:id",
    label: "Articles",
    icon: StickyNote,
    component: ArticlePage,
    hidden: true,
    isProtected: true,
  },
  aigenerator: {
    path: "/ai-generator",
    label: "AI Image Generator",
    icon: Inbox,
    component: AIGeneratorPage,
  },
  news: {
    path: "/news",
    label: "News",
    icon: Newspaper,
    component: NewsPage,
    isProtected: false,
  },
  auth: {
    path: "/login",
    label: "Login",
    icon: Settings,
    component: AuthPage,
    hidden: true,
  },
  bookings: {
    path: "/bookings",
    label: "Booking a tool",
    icon: BookMarked,
    component: BookingsPage,
    isProtected: true,
  },
  booking: {
    path: "/bookings/:id",
    label: "Booking item",
    icon: BookMarked,
    component: BookingPage,
    isProtected: true,
    hidden: true,
  },
  gallery: {
    path: "/gallery",
    label: "Gallery",
    icon: Images,
    component: GalleryPage,
  },
  products: {
    path: "/products",
    label: "Products",
    component: ProductsPage,
    isProtected: true,
    icon: PackageSearch,
  },
  basket: {
    path: "/basket",
    label: "Pay",
    icon: ShoppingBasket,
    component: BasketPage,
    hidden: true,
  },
  notFound: {
    path: "*",
    label: "404 Not Found",
    component: NotFound,
    hidden: true,
  },
  profile: {
    path: "/profile",
    label: "Profile",
    component: ProfilePage,
    icon: PersonStanding,
    hidden: true,
    isProtected: true
  }
};
