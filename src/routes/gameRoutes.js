import { Router } from "express";
import {
    createGame,
    getGames,
    getGameById,
    updateGame,
    deleteGame,
    startGame,
    finishGame,
    getStatusGame,
    getPlayersGame,
    getNextPlayer
} from "../controllers/gameController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.post('/games', authMiddleware, createGame);
router.get('/games', getGames);
router.get('/games/:id', getGameById);
router.put('/games/:id', updateGame);
router.delete('/games/:id', deleteGame);
router.post('/startGame', authMiddleware, startGame);
router.post('/finishGame', authMiddleware, finishGame);
router.get('/statusGame', getStatusGame);
router.get('/playersGame', getPlayersGame);
router.get('/nextPlayer', getNextPlayer);

export default router;
