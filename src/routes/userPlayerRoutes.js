import { Router } from 'express';
import userPlayerController from '../controllers/userPlayerController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { requestTracking } from '../middlewares/requestTracking/requestTracking.js';

const router = Router();

router.post('/register', requestTracking(userPlayerController.registerUserPlayer));
router.get('/users', requestTracking(userPlayerController.getUserPlayers));
router.get('/users/:id', userPlayerController.getUserPlayerById);
router.put('/users/:id', userPlayerController.updateUserPlayer);
router.delete('/users/:id', userPlayerController.deleteUserPlayer);
router.get('/infuser', authMiddleware, requestTracking(userPlayerController.getBasicDetails));

export default router;