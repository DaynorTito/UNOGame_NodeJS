import { 
    createGameService, 
    getGamesService, 
    getGameByIdService, 
    updateGameService, 
    deleteGameService,
    startGameService,
    endGameService,
    getPlayersService,
    getNextTurnService
} from "../services/gameService.js";
import { getUserPlayerByIdService } from "../services/userPlayerService.js";

const createGame = async (req, res, next) => {
    try {
        const game = await createGameService(req.body, req.user);
        res.status(201).json({message: 'Game created successfully', id: game.id});
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
    try {
        const game = await getGameByIdService(id);
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
    try {
        const game = await updateGameService(id, req.body);
        res.status(200).json(game);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteGame = async (req, res, next) => {
    const { id } = req.params;
    try {
        await deleteGameService(id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const startGame = async (req, res, next) => {
    const { gameId } = req.body;
    const user = req.user;
    try {
        const game = await startGameService(gameId, req.body, user.id)
        res.status(200).json({message: 'Game started successfully'});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const finishGame = async (req, res, next) => {
    const { gameId } = req.body;
    const user = req.user;
    try {
        const game = await endGameService(gameId, req.body, user.id)
        res.status(200).json({message: 'Game ended successfully'});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getStatusGame = async (req, res, next) => {
    const { gameId } = req.body;
    try {
        const game = await getGameByIdService(gameId);
        if (!game)
            return res.status(404).json({ message: 'Game not found' });
        res.status(200).json({gameId, state: game.status});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getPlayersGame = async (req, res, next) => {
    const { gameId } = req.body;
    try {
        const players = await getPlayersService(gameId);
        res.status(200).json({gameId, players});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getNextPlayer = async (req, res, next) => {
    const { gameId } = req.body;
    try {
        const idNextPlayer = await getNextTurnService(gameId);
        const player = await getUserPlayerByIdService(idNextPlayer);
        res.status(200).json({gameId, username: player.username});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export {createGame, getGames, getGameById, updateGame, deleteGame, startGame, finishGame, getStatusGame, getPlayersGame, getNextPlayer};