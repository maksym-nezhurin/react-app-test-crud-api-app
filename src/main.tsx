// @ts-nocheck
import {StrictMode} from 'react'
import {unstable_HistoryRouter as HistoryRouter} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import {createRoot} from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {ToastContainer} from "react-toastify";
import { Toaster } from "./components/ui/sonner"
import {AuthProvider} from "./contexts/AuthProvider.tsx";

const browserHistory = createBrowserHistory();

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <HistoryRouter history={browserHistory} basename='/react-app-test-crud-api-app'>
            <ToastContainer />
            <Toaster/>
            <AuthProvider>
                <App/>
            </AuthProvider>
        </HistoryRouter>
    </StrictMode>,
)
