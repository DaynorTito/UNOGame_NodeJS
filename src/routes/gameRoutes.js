import { Router } from "express";
import gameController from "../controllers/gameController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { requestTracking } from "../middlewares/requestTracking/requestTracking.js";

const router = Router();

router.post('/games', authMiddleware, requestTracking(gameController.createGame));
router.get('/games', gameController.getGames);
router.get('/games/:id', gameController.getGameById);
router.put('/games/:id', gameController.updateGame);
router.delete('/games/:id', gameController.deleteGame);
router.post('/startGame', authMiddleware, requestTracking(gameController.startGame));
router.post('/finishGame', authMiddleware, requestTracking(gameController.finishGame));
router.get('/statusGame', requestTracking(gameController.getStatusGame));
router.get('/playersGame', requestTracking(gameController.getPlayersGame));
router.get('/nextPlayer', requestTracking(gameController.getNextPlayer));
router.post('/dealCards', requestTracking(gameController.dealCardsGame));
router.post('/playCard', authMiddleware, requestTracking(gameController.playCardUser));
router.post('/drewCardFromDeck', authMiddleware, requestTracking(gameController.pickUpCard));
router.post('/sayUno', authMiddleware, requestTracking(gameController.sayUno));
router.post('/challengePlayer', authMiddleware, requestTracking(gameController.challengePlayer));
router.post('/challengePlayer', authMiddleware, requestTracking(gameController.challengePlayer));
router.get('/getCardDiscardPile', authMiddleware, requestTracking(gameController.getCardDiscardPile));


export default router;
