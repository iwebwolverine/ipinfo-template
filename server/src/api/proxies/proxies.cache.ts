import { MemoryCacheStorage } from './memory-cache-storage';

export class ProxiesCache {
    private storage: MemoryCacheStorage;
    private lifetimeMS: number;
    constructor({
        storage,
        lifetime
    }: { storage: MemoryCacheStorage, lifetime: number }) {
        this.storage = storage;
        this.lifetimeMS = lifetime || 5000;
    }


    get(ip) {
        const proxy = this.storage.get(ip);

        if (proxy && this.isValid(proxy.time)) {
            return proxy.value;
        }

        this.storage.remove(ip);
        return null;
    }

    add(proxy) {
        return this.storage.set(proxy.ip, proxy);
    }

    private isValid(date: Date) {
        var now = new Date();
        var createdAt = new Date(date);
        return now.getTime() - createdAt.getTime() <= this.lifetimeMS;
    }
}