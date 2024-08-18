import { Router } from "express";
import {
    createDiscardCard,
    getDiscardCards,
    getDiscardCardById,
    updateDiscardCard,
    deleteDiscardCard
} from "../controllers/discardsController.js";

const router = Router();

router.post('/discards', createDiscardCard);
router.get('/discards', getDiscardCards);
router.get('/discards/:id', getDiscardCardById);
router.put('/discards/:id', updateDiscardCard);
router.delete('/discards/:id', deleteDiscardCard);


export default router;
