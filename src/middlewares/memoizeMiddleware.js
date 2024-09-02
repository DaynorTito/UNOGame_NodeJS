import { CacheMiddleware } from "./CacheMiddleware.js"

export const memoizationMiddleware = (config) => {
    const middleware = new CacheMiddleware(config);
    return middleware.handle.bind(middleware);
};