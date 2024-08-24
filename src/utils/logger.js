import { createLogger, transports, format } from 'winston';
const { combine, timestamp, printf, errors ,colorize, prettyPrint, splat} = format;

const logFormat = printf(({ level, message, timestamp, stack, requestId }) => {
    return `[${timestamp}]  ${level} reqId: ${requestId}: ${stack || message}`;
});

const loggerRequest = (idReq) => {
    const logger = createLogger({
        level: 'info',
        format: combine(
            splat(),
            prettyPrint(),
            timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            colorize(),
            errors({ stack: true }),
            logFormat
        ),
        defaultMeta: { requestId: idReq },
        transports: [
            new transports.File({ filename: 'error.log', level: 'error' }),
            new transports.File({ filename: 'combined.log' }),
        ],
        exceptionHandlers: [
            new transports.File({ filename: 'exceptions.log' })
        ]
    });
    
    if (process.env.NODE_ENV !== 'production') {
        logger.add(new transports.Console({
            format: format.simple(),
        }));
    }
    
    return logger;
};

export { loggerRequest };