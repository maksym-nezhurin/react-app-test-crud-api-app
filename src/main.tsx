// @ts-nocheck
import {StrictMode} from 'react'
import {unstable_HistoryRouter as HistoryRouter} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import {createRoot} from 'react-dom/client'
import App from './App.tsx'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import './index.css'
import {ToastContainer} from "react-toastify";
import { Toaster } from "./components/ui/sonner"
import {AuthProvider} from "./contexts/AuthProvider.tsx";

const browserHistory = createBrowserHistory();
const stripePromise = loadStripe('pk_test_51QID7gKXpmxOoBq6YPZ1233Otn3dvNk33RstTnqbWlKhO9dritCeeaeLPqnGRvRbeCBw0VGTDrFRNiE2pCsb2cpN00ij8zwPQg');

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <HistoryRouter history={browserHistory} basename='/react-app-test-crud-api-app'>
            <ToastContainer />
            <Toaster/>
            <AuthProvider>
                <Elements stripe={stripePromise}>
                    <App />
                </Elements>
            </AuthProvider>
        </HistoryRouter>
    </StrictMode>,
)
