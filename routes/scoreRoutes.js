import { Route } from "express";
import {
    createScore,
    getScores,
    getScoreById,
    updateScore,
    deleteScore
} from "../controllers/scoreController.js";

const router = Router();

router.post('/api/v1/scores', createScore);
router.get('/api/v1/scores', getScores);
router.get('/api/v1/scores/:id', getScoreById);
router.put('/api/v1/scores/:id', updateScore);
router.delete('/api/v1/scores/:id', deleteScore);


export default router;
