import express from 'express'
import cardRouter from './routes/cardRoutes.js';
import gameRouter from './routes/gameRoutes.js';
import playerRouter from './routes/playerRoutes.js';
import scoreRouter from './routes/scoreRoutes.js';
import userRouter from './routes/userRoutes.js';
import authRouter from './routes/authRoutes.js';

export function initServer(port) {
    const app = express();
    app.use(express.json());
    app.use('/api/v1',cardRouter);
    app.use('/api/v1',gameRouter);
    app.use('/api/v1',playerRouter);
    app.use('/api/v1',scoreRouter);
    app.use('/api/v1',userRouter);
    app.use('/api/v1',authRouter);

    app.listen(port, ()=> {
        console.log(`Server listenig on port ${port}`);
    });
};