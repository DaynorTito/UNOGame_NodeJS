import { Route } from "express";
import {
    createPlayer,
    getPlayers,
    getPlayerById,
    updatePlayer,
    deletePlayer
} from "../controllers/playerController";

const router = Router();

router.post('/api/v1/players', createPlayer);
router.get('/api/v1/players', getPlayers);
router.get('/api/v1/players/:id', getPlayerById);
router.put('/api/v1/players/:id', updatePlayer);
router.delete('/api/v1/players/:id', deletePlayer);


export default router;
