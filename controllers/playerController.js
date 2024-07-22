import { 
    createPlayerService, 
    getPlayersService, 
    getPlayerByIdService, 
    updatePlayerService, 
    deletePlayerService
} from "../services/playerService.js";

const createPlayer = async (req, res, next) => {
    try {
        const player = await createPlayerService(req.body);
        res.status(201).json(player);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getPlayers =  async (req, res, next) => {
    try {
        const players = await getPlayersService();
        res.status(200).json(players);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getPlayerById = async (req, res, next) => {
    const { id } = req.params;
    const numericId = parseInt(id, 10);
    try {
        const player = await getPlayerByIdService(numericId);
        if (!player) {
            return res.status(404).json({ message: 'Player not found' });
        }
        res.status(200).json(player);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updatePlayer = async (req, res, next) => {
    const { id } = req.params;
    const numericId = parseInt(id, 10);
    try {
        const player = await updatePlayerService(numericId, req.body);
        res.status(200).json(player);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deletePlayer = async (req, res, next) => {
    const { id } = req.params;
    const numericId = parseInt(id, 10);
    try {
        await deletePlayerService(numericId);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export {createPlayer, getPlayers, getPlayerById, updatePlayer, deletePlayer};