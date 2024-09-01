import { Router } from "express";
import scoreController from "../controllers/scoreController.js";

const router = Router();

router.post('/scores', scoreController.createScore);
router.get('/scores', scoreController.getScores);
router.get('/scores/:id', scoreController.getScoreById);
router.put('/scores/:id', scoreController.updateScore);
router.delete('/scores/:id', scoreController.deleteScore);
router.get('/scoresPlayers', scoreController.getPlayersScores);


export default router;
