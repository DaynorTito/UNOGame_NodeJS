import { Router } from "express";
import {
    createGame,
    getGames,
    getGameById,
    updateGame,
    deleteGame
} from "../controllers/gameController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.post('/games', authMiddleware, createGame);
router.get('/games', getGames);
router.get('/games/:id', getGameById);
router.put('/games/:id', updateGame);
router.delete('/games/:id', deleteGame);


export default router;
