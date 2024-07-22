import { Router } from "express";
import {
    createCard,
    getCards,
    getCardById,
    updateCard,
    deleteCard
} from "../controllers/cardController.js";

const router = Router();

router.post('/cards', createCard);
router.get('/cards', getCards);
router.get('/cards/:id', getCardById);
router.put('/cards/:id', updateCard);
router.delete('/cards/:id', deleteCard);


export default router;
