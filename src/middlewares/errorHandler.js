
const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const userMessage = err.userMessage || 'Something went wrong. Please try again later.';
    const developerMessage = err.message || 'Internal Server Error';
    const requestId = req.headers['x-request-id'] || 'N/A';

    const response = {
        error: {
            status: statusCode,
            message: developerMessage,
            path: req.originalUrl,
            method: req.method,
            requestId: requestId,
        }
    };
    req.logger.error('Error occurred', {
        statusCode,
        path: req.originalUrl,
        method: req.method,
        requestId: requestId,
        errorMessage: developerMessage,
        stack: err.stack,
    });
    res.status(statusCode).json(response);
}

export default errorHandler;