import { makeAutoObservable } from "mobx";

class AuthStore {
    token: string | null = null;

    constructor() {
        makeAutoObservable(this);
        this.loadTokenFromStorage();
    }

    setToken = (token: string) => {
        this.token = token;
        localStorage.setItem("authToken", token);
    };

    removeToken = () => {
        this.token = null;
        localStorage.removeItem("authToken");
    };

    loadTokenFromStorage = () => {
        const storedToken = localStorage.getItem("authToken");
        if (storedToken) {
            this.token = storedToken;
        }
    };
}


const authStore = new AuthStore();
export default authStore;
