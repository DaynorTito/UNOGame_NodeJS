import express from 'express'
import cardRouter from './routes/cardRoutes.js';
import gameRouter from './routes/gameRoutes.js';
import playerRouter from './routes/playerRoutes.js';
import scoreRouter from './routes/scoreRoutes.js';


export function initServer(port) {
    const app = express();
    app.use(express.json());
    app.use('/api/v1',cardRouter);
    app.use('/api/v1',gameRouter);
    app.use('/api/v1',playerRouter);
    app.use('/api/v1',scoreRouter);

    app.listen(port, ()=> {
        console.log(`Server listenig on port ${port}`);
    });
};