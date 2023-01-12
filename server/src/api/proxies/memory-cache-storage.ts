export class MemoryCacheStorage implements IMemoryCacheStorage{
    private storage: {[key: string]: any} = {};

    set(key, value) {
        this.storage[key] = {
            time: new Date(),
            value,
        };
    }

    get(key) {
        return this.storage[key];
    }
    
    remove(key) {
        delete this.storage[key];
    }
}

interface IMemoryCacheStorage {
    get: (key: string) => { time: Date, value: any };
    set: (key: string, value: any) => void;
    remove: (key: string) => void;
}