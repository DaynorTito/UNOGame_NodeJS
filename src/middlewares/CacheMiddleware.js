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
    }

    /**
     * Middleware handler function to handle caching logic.
     * 
     * @param {Object} req - The HTTP request object.
     * @param {Object} res - The HTTP response object.
     * @param {Function} next - The next middleware function to call.
     */
    handle(req, res, next) {
        const key = `${req.method}-${req.originalUrl}`;

        // Check if the cache has a valid entry for the current request
        if (this.cache.has(key)) {
            const { value, expiry } = this.cache.get(key);
            console.log(`[CACHE] Cache find for key: ${key}`);

            // If the cached entry is still valid (not expired)
            if (expiry > Date.now()) {
                // Refresh the cache expiry time
                this.cache.set(key, { value, expiry: Date.now() + this.maxAge });

                res.setHeader('Content-Type', 'application/json');
                
                res.send(value); 
                return;
            } else {
                // If the cached entry has expired, remove it from the cache
                console.log(`[CACHE] Cache expired key: ${key}`);
                this.cache.delete(key);
            }
        }

        // Save the original send function of the response object
        const originalSend = res.send.bind(res);

        res.send = (body) => {
            if (this.cache.size >= this.max) {
                // Remove the oldest entry (LRU policy)
                const oldestKey = this.cache.keys().next().value;
                this.cache.delete(oldestKey);
            }

            console.log(`[CACHE] New key in cache: ${key}`);

            this.cache.set(key, { value: body, expiry: Date.now() + this.maxAge });

            originalSend(body);
        };

        next();
    }
}
