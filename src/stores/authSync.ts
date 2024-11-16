import { autorun } from 'mobx';
import {authStore} from './authStore';
import StorageWrapper from "../utils/storageWrapper.ts";

const storage = new StorageWrapper();

export const syncLogoutWithLocalStorage = () => {
    window.addEventListener('storage', (event) => {
        if (event.key === 'logout' && event.newValue === 'true') {
            authStore.isLoggedIn = false;
            storage.removeItem('logout');
        }
    });

    // Optional: Sync back to localStorage when store changes
    autorun(() => {
        if (!authStore.isLoggedIn) {
            storage.setItem('logout', 'true');
        }
    });
};
