import { 
    createGameService, 
    getGamesService, 
    getGameByIdService, 
    updateGameService, 
    deleteGameService
} from "../services/gameService.js";

const createGame = async (req, res, next) => {
    try {
        const game = await createGameService(req.body);
        res.status(201).json(game);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getGames =  async (req, res, next) => {
    try {
        const games = await getGamesService();
        res.status(200).json(games);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getGameById = async (req, res, next) => {
    const { id } = req.params;
    const numericId = parseInt(id, 10);
    try {
        const game = await getGameByIdService(numericId);
        if (!game) {
            return res.status(404).json({ message: 'Game not found' });
        }
        res.status(200).json(game);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateGame = async (req, res, next) => {
    const { id } = req.params;
    const numericId = parseInt(id, 10);
    try {
        const game = await updateGameService(numericId, req.body);
        res.status(200).json(game);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteGame = async (req, res, next) => {
    const { id } = req.params;
    const numericId = parseInt(id, 10);
    try {
        await deleteGameService(numericId);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export {createGame, getGames, getGameById, updateGame, deleteGame};