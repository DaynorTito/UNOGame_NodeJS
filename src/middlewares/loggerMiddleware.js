import { loggerRequest } from '../utils/logger.js';
import { v4 as uuidv4 } from 'uuid';

const loggerRegister = (req, res, next) => {
    const reqId = req.headers["x-request-id"] || uuidv4();

    const logger = loggerRequest(reqId);

    logger.info(`Request: ${req.method} path: ${req.url}`);
    req.logger = logger;

    next();
};

export { loggerRegister };