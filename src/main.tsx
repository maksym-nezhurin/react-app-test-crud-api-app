// @ts-nocheck
import {StrictMode} from 'react'
import {unstable_HistoryRouter as HistoryRouter} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import {createRoot} from 'react-dom/client'
import App from './App.tsx'
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import './index.css'
import {ToastContainer} from "react-toastify";
import {Toaster} from "./components/ui/sonner"
import {AuthProvider} from "./contexts/AuthProvider.tsx";
import {CardProvider} from "./contexts/CardProvider.tsx";
import {SidebarProvider} from "./components/ui/sidebar.tsx";

const browserHistory = createBrowserHistory();
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_API_KEY);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <HistoryRouter history={browserHistory} basename='/react-app-test-crud-api-app'>
            <ToastContainer/>
            <Toaster/>
            <AuthProvider>
                <Elements stripe={stripePromise}>
                    <CardProvider>
                        <SidebarProvider>
                        <App/>
                        </SidebarProvider>
                    </CardProvider>
                </Elements>
            </AuthProvider>
        </HistoryRouter>
    </StrictMode>,
)
