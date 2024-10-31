type StorageType = 'localStorage' | 'sessionStorage';

class StorageWrapper {
    private storage: Storage;

    constructor(type: StorageType = 'localStorage') {
        this.storage = window[type];
    }

    setItem(key: string, value: string) {
        this.storage.setItem(key, value);
        window.dispatchEvent(new Event('storageUpdate'));
    }

    getItem(key: string): string | null {
        return this.storage.getItem(key);
    }

    removeItem(key: string) {
        this.storage.removeItem(key);
    }

    clear() {
        this.storage.clear();
    }

    // Additional methods for objects (to handle JSON conversion)
    setObject(key: string, value: object) {
        this.setItem(key, JSON.stringify(value));
    }

    getObject(key: string): object | null {
        const item = this.getItem(key);
        return item ? JSON.parse(item) : null;
    }
}

export default StorageWrapper;
