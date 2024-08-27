import { Router } from "express";
import gameController from "../controllers/gameController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.post('/games', authMiddleware, gameController.createGame);
router.get('/games', gameController.getGames);
router.get('/games/:id', gameController.getGameById);
router.put('/games/:id', gameController.updateGame);
router.delete('/games/:id', gameController.deleteGame);
router.post('/startGame', authMiddleware, gameController.startGame);
router.post('/finishGame', authMiddleware, gameController.finishGame);
router.get('/statusGame', gameController.getStatusGame);
router.get('/playersGame', gameController.getPlayersGame);
router.get('/nextPlayer', gameController.getNextPlayer);
router.post('/dealCards', gameController.dealCardsGame);
router.post('/playCard', authMiddleware, gameController.playCardUser);
export default router;
