import { Router } from "express";
import cardController from "../controllers/cardController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { requestTracking } from "../middlewares/requestTracking/requestTracking.js";

const router = Router();

router.post("/cards", cardController.createCard);
router.get("/cards", requestTracking(cardController.getCards));
router.get("/cards/:id", cardController.getCardById);
router.put("/cards/:id", cardController.updateCard);
router.delete("/cards/:id", cardController.deleteCard);
router.get("/userCards", authMiddleware,requestTracking(cardController.userCardsUser));
router.get("/allUserWithCards", requestTracking(cardController.userAllCardsUsers));

export default router;
