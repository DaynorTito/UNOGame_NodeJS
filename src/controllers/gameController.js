import userPlayerService from "../services/userPlayerService.js";
import gameService from "../services/gameService.js";
import gameStateService from "../services/game/gameStateService.js";
import dealCards from "../services/cards/dealCards.js"

const createGame = async (req, res, next) => {
    try {
        const game = await gameService.createGameService(req.body, req.user);
        res.status(201).json({message: 'Game created successfully', id: game.id});
    } catch (error) {
        next(error);
    }
};

const getGames =  async (req, res, next) => {
    try {
        const games = await gameService.getGamesService();
        res.status(200).json(games);
    } catch (error) {
        next(error);
    }
};

const getGameById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const game = await gameService.getGameByIdService(id);
        if (!game) {
            return res.status(404).json({ message: 'Game not found' });
        }
        res.status(200).json(game);
    } catch (error) {
        next(error);
    }
};

const updateGame = async (req, res, next) => {
    const { id } = req.params;
    try {
        const game = await gameService.updateGameService(id, req.body);
        res.status(200).json(game);
    } catch (error) {
        next(error);
    }
};

const deleteGame = async (req, res, next) => {
    const { id } = req.params;
    try {
        await gameService.deleteGameService(id);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};

const startGame = async (req, res, next) => {
    const { gameId } = req.body;
    const user = req.user;
    try {
        const game = await gameStateService.startGameService(gameId, req.body, user.id)
        res.status(200).json({message: 'Game started successfully', idGame: game.id});
    } catch (error) {
        next(error);
    }
};

const finishGame = async (req, res, next) => {
    const { gameId } = req.body;
    const user = req.user;
    try {
        const game = await gameStateService.endGameService(gameId, req.body, user.id)
        res.status(200).json({message: 'Game ended successfully', idGame: game.id});
    } catch (error) {
        next(error);
    }
};

const getStatusGame = async (req, res, next) => {
    const { gameId } = req.body;
    try {
        const game = await gameService.getGameByIdService(gameId);
        if (!game)
            return res.status(404).json({ message: 'Game not found' });
        res.status(200).json({gameId, state: game.status});
    } catch (error) {
        next(error);
    }
};

const getPlayersGame = async (req, res, next) => {
    const { gameId } = req.body;
    try {
        const players = await gameStateService.getPlayersService(gameId);
        res.status(200).json({gameId, players});
    } catch (error) {
        next(error);
    }
};

const getNextPlayer = async (req, res, next) => {
    const { gameId } = req.body;
    try {
        const idNextPlayer = await gameStateService.getNextTurnService(gameId);
        const player = await userPlayerService.getUserPlayerByIdService(idNextPlayer);
        res.status(200).json({gameId, username: player.username});
    } catch (error) {
        next(error);
    }
};

const dealCardsGame = async (req, res, next) => {
    const { gameId, cardsPerPlayer } = req.body;
    try {
        const dealCardsPlayer = await dealCards.dealCardsPlayer(gameId, cardsPerPlayer);
        res.status(200).json(
            {message: 'Cards dealt successfully', players: dealCardsPlayer.players}
        );
    } catch (error) {
        next(error);
    }
}

export default {
    createGame, 
    getGames, 
    getGameById, 
    updateGame, 
    deleteGame, 
    startGame, 
    finishGame, 
    getStatusGame, 
    getPlayersGame, 
    getNextPlayer,
    dealCardsGame
};