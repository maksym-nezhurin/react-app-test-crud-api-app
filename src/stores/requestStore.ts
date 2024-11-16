import { makeAutoObservable } from 'mobx';

class RequestStore {
    isRequested: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    setRequested = (value: boolean = true) => {
        console.log(' +++ +++ setRequested', value)
        if (this.isRequested !== value)
            this.isRequested = value;
    }
}

export const requestStore = new RequestStore();
export default requestStore;
