import { Router } from "express";
import cardController from "../controllers/cardController.js";

const router = Router();

router.post("/cards", cardController.createCard);
router.get("/cards", cardController.getCards);
router.get("/cards/:id", cardController.getCardById);
router.put("/cards/:id", cardController.updateCard);
router.delete("/cards/:id", cardController.deleteCard);

export default router;
