import { Route } from "express";
import {
    createGame,
    getGames,
    getGameById,
    updateGame,
    deleteGame
} from "../controllers/gameController";

const router = Router();

router.post('/api/v1/games', createGame);
router.get('/api/v1/games', getGames);
router.get('/api/v1/games/:id', getGameById);
router.put('/api/v1/games/:id', updateGame);
router.delete('/api/v1/games/:id', deleteGame);


export default router;
