import { Router } from "express";
import {
    createScore,
    getScores,
    getScoreById,
    updateScore,
    deleteScore
} from "../controllers/scoreController.js";

const router = Router();

router.post('/scores', createScore);
router.get('/scores', getScores);
router.get('/scores/:id', getScoreById);
router.put('/scores/:id', updateScore);
router.delete('/scores/:id', deleteScore);


export default router;
