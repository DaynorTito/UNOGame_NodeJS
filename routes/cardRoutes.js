import { Route } from "express";
import {
    createCard,
    getCards,
    getCardById,
    updateCard,
    deleteCard
} from "../controllers/cardController.js";

const router = Router();

router.post('/api/v1/cards', createCard);
router.get('/api/v1/cards', getCards);
router.get('/api/v1/cards/:id', getCardById);
router.put('/api/v1/cards/:id', updateCard);
router.delete('/api/v1/cards/:id', deleteCard);


export default router;
