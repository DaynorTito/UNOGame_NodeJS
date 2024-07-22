import { initServer } from './app.js';
import { initDatabase } from './config/database.js';
const port = 3000;


(async () => {
    await initDatabase();
    initServer(port);
})();