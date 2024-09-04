export class CacheManager {

    constructor(maxSize, maxAge) {
        this.cache = new Map();
        this.maxSize = maxSize;
        this.maxAge = maxAge;
    }

    get(key) {
        const cached = this.cache.get(key);

        if (cached && cached.expiry > Date.now()) {
            cached.expiry = Date.now() + this.maxAge;
            return cached.value;
        }
        this.cache.delete(key);
        return null;
    }

    set(key, value) {
        if (this.cache.size >= this.maxSize) {
            const oldestKey = this.cache.keys().next().value;
            this.cache.delete(oldestKey);
        }
        this.cache.set(key, { value, expiry: Date.now() + this.maxAge });
    }

    invalidate(key) {
        this.cache.delete(key);
    }

    invalidateAll() {
        this.cache.clear();
    }
}
