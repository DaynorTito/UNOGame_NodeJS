import { Router } from 'express';
import { registerUserPlayer, getUserPlayers, getUserPlayerById, updateUserPlayer, deleteUserPlayer, getBasicDetails} from '../controllers/userPlayerController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = Router();

router.post('/register', registerUserPlayer);
router.get('/users', getUserPlayers);
router.get('/users/:id', getUserPlayerById);
router.put('/users/:id', updateUserPlayer);
router.delete('/users/:id', deleteUserPlayer);
router.get('/infuser', authMiddleware,getBasicDetails);
export default router;