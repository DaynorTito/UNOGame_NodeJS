const errorHandler = (err, req, res, next) => {
    const statusCode = err.status || 500;
    const messageError = err.message || 'Internal Server Error';
    
    if (err.name === 'ValidationError') {
        return res.status(400).json({ error: err.message });
    }

    const response = {
        error: {
            message: err.message || messageError,
        }
    };
    console.log(err);
    res.status(statusCode).json(response);
};

export default errorHandler;