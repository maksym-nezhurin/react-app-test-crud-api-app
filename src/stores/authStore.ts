import { makeAutoObservable } from "mobx";
import StorageWrapper from "../utils/storageWrapper.ts";

const storage = new StorageWrapper();

interface IProfile {
  name?: string;
  id?: string;
}

interface ILoginData {
  token: string;
  user: IProfile
}

class AuthStore {
  isLoggedIn: boolean = false;
  token: string | null = null;
  userId: string | null = null;
  profile: IProfile | null = null;

  constructor() {
    makeAutoObservable(this);
    this.loadTokenFromStorage();
  }

  login = ({ token, user: {
    id, name
  }  }: ILoginData) => {
    this.isLoggedIn = true;
    this.setToken(token);
    this.setProfileData('name', name as string);

    storage.setItem("logout", "false");

    if (id) {
      this.userId = id;
    }
  };

  logout = () => {
    this.isLoggedIn = false;
    this.setToken("");
    storage.setItem("logout", "true");
    this.removeToken();
  };

  setToken = (token: string) => {
    this.token = token;
  };

  removeToken = () => {
    storage.removeItem("authToken");
  };

  loadTokenFromStorage = () => {
    const storedToken = storage.getItem("authToken");

    if (storedToken) {
      this.token = storedToken;
    }
  };

  setProfileData = (prop: keyof IProfile, value: string) => {
    this.profile = {
      ...this.profile,
      [prop]: value
    }
  }
}

export const authStore = new AuthStore();
export default AuthStore;
