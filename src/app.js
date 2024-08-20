import express from 'express'
import cardRouter from './routes/cardRoutes.js';
import gameRouter from './routes/gameRoutes.js';
import scoreRouter from './routes/scoreRoutes.js';
import userPlayerRouter from './routes/userPlayerRoutes.js';
import authRouter from './routes/authRoutes.js';
import attendeeRouter from './routes/attendeeRoutes.js';
import discardRouter from './routes/discardsRoutes.js';
import errorHandler from './middlewares/errorHandler.js';

export function initServer(port) {
    const app = express();
    app.use(express.json());

    app.use('/api/v1',cardRouter);
    app.use('/api/v1',gameRouter);
    app.use('/api/v1',scoreRouter);
    app.use('/api/v1',userPlayerRouter);
    app.use('/api/v1',authRouter);
    app.use('/api/v1',attendeeRouter);
    app.use('/api/v1',discardRouter);
    app.use(errorHandler);
    app.listen(port, ()=> {
        console.log(`Server listenig on port ${port}`);
    });
};