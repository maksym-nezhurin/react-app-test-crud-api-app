import { makeAutoObservable } from 'mobx';

class RequestStore {
    isRequested: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    setRequested = (value: boolean = true) => {

        if (this.isRequested !== value)
            this.isRequested = value;
    }
}

export const requestStore = new RequestStore();
export default requestStore;
