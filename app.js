import express from 'express'
import router from './routes/playerRoutes.js';

export function initServer(port) {
    const app = express();
    app.use(express.json());
    app.use(router);
    app.listen(port, ()=> {
        console.log(`Server listenig on port ${port}`);
    });
};