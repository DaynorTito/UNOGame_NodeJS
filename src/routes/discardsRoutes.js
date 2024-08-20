import { Router } from "express";
import discardsController from "../controllers/discardsController.js";

const router = Router();

router.post('/discards', discardsController.createDiscardCard);
router.get('/discards', discardsController.getDiscardCards);
router.get('/discards/:id', discardsController.getDiscardCardById);
router.put('/discards/:id', discardsController.updateDiscardCard);
router.delete('/discards/:id', discardsController.deleteDiscardCard);


export default router;
