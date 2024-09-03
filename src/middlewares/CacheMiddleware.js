export class CacheMiddleware {
    /**
     * Constructor for CacheMiddleware
     * Initializes the cache and configures cache settings
     * 
     * @param {Object} config - Configuration object for the cache
     * @param {number} [config.max=50] - Maximum number of items to store in the cache
     * @param {number} [config.maxAge=30000] - Maximum age (in milliseconds) before a cached item expires
     */
    constructor(config) {
        this.cache = new Map();
        this.max = config.max || 50;
        this.maxAge = config.maxAge || 30000;
        this.cacheableRoutes = ['/cards'];  // Rutas específicas que deben ser cacheadas
    }

    /**
     * Middleware handler function to handle caching logic.
     * 
     * @param {Object} req - The HTTP request object.
     * @param {Object} res - The HTTP response object.
     * @param {Function} next - The next middleware function to call.
     */
    handle(req, res, next) {
        if (!this.cacheableRoutes.some(route => req.originalUrl.startsWith(route))) {
            return next();
        }

        const key = `${req.method}-${req.originalUrl}`;

        if (this.cache.has(key)) {
            const { value, expiry } = this.cache.get(key);
            console.log(`[CACHE] Cache found for key: ${key}`);

            if (expiry > Date.now()) {
                this.cache.set(key, { value, expiry: Date.now() + this.maxAge });

                res.setHeader('Content-Type', 'application/json');
                return res.send(value);
            } else {
                console.log(`[CACHE] Cache expired for key: ${key}`);
                this.cache.delete(key);
            }
        }

        const originalSend = res.send.bind(res);

        res.send = (body) => {
            if (this.cache.size >= this.max) {
                const oldestKey = this.cache.keys().next().value;
                this.cache.delete(oldestKey);
            }

            console.log(`[CACHE] New key in cache: ${key}`);

            this.cache.set(key, { value: body, expiry: Date.now() + this.maxAge });
            originalSend(body);
        };

        next();
    }

    /**
     * Invalidate cache for a specific key.
     * This can be used when the data changes and the cache needs to be refreshed.
     * 
     * @param {string} key - The key representing the cache entry to invalidate.
     */
    invalidate(key) {
        if (this.cache.has(key)) {
            console.log(`[CACHE] Invalidating key: ${key}`);
            this.cache.delete(key);
        }
    }
}
