import { Router } from 'express';
import userPlayerController from '../controllers/userPlayerController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = Router();

router.post('/register', userPlayerController.registerUserPlayer);
router.get('/users', userPlayerController.getUserPlayers);
router.get('/users/:id', userPlayerController.getUserPlayerById);
router.put('/users/:id', userPlayerController.updateUserPlayer);
router.delete('/users/:id', userPlayerController.deleteUserPlayer);
router.get('/infuser', authMiddleware,userPlayerController.getBasicDetails);

export default router;