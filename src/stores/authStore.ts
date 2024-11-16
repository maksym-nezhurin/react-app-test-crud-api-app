import { makeAutoObservable } from "mobx";
import StorageWrapper from "../utils/storageWrapper.ts";
import {logoutUser} from "../services/user.service.ts";

const storage = new StorageWrapper();

class AuthStore {
    isLoggedIn: boolean = false;
    token: string | null = null;
    userId: string | null = null;

    constructor() {
        makeAutoObservable(this);
        this.loadTokenFromStorage();
    }

    login = (token: string, userId?: string) => {
        this.isLoggedIn = true;
        this.setToken(token);
        storage.setItem('logout', 'false');

        if (userId) {
            this.userId = userId;
        }
    }

    logout = () => {
        console.log('call')

        this.isLoggedIn = false;
        this.setToken('');
        storage.setItem('logout', 'true');
        this.removeToken();
    }

    setToken = (token: string) => {
        this.token = token;
    };

    removeToken = () => {
        storage.removeItem('authToken');
    };

    loadTokenFromStorage = () => {
        const storedToken = storage.getItem("authToken");

        if (storedToken) {
            this.token = storedToken;
        }
    };
}


export const authStore = new AuthStore();
export default AuthStore;
