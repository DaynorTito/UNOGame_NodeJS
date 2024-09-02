import { Router } from "express";
import scoreController from "../controllers/scoreController.js";
import { requestTracking } from "../middlewares/requestTracking/requestTracking.js";

const router = Router();

router.post('/scores', scoreController.createScore);
router.get('/scores', requestTracking(scoreController.getScores));
router.get('/scores/:id', scoreController.getScoreById);
router.put('/scores/:id', scoreController.updateScore);
router.delete('/scores/:id', scoreController.deleteScore);
router.get('/scoresPlayers', requestTracking(scoreController.getPlayersScores));


export default router;
