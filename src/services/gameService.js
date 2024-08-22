import { ValidationError, UnauthorizedError } from "../errors/customError.js";
import { GameStatus } from "../utils/gameStatus.js";
import attendeeService from "./attendeeService.js";
import { UserStatus } from "../utils/userStatus.js";

import container from "../config/container.js"

const gameRepository = container.resolve('gameRepository');
const attendeeRepository = container.resolve('attendeeRepository');
const userPlayerRepository = container.resolve('userPlayerRepository');


const createGameService = async (GameData, user) => {
    GameData.userCreatedId = user.id;
    if (!GameData.userCreatedId)
        throw new ValidationError('You must provide a valid token access');
    return await gameRepository.create(GameData);
};

const getGamesService = async () => {
    return await gameRepository.findAll();
};

const getGameByIdService = async (id) => {
    const game = await gameRepository.findById(id);
    if (!game)
        throw new ValidationError('Game does not exist');
    return game;
};

const updateGameService = async (id, updateData) => {
    const game = await gameRepository.findById(id);
    if (game) {
        await gameRepository.update(id, updateData);
        return game;
    }
    throw new Error('Game not found');
};

const startGameService = async (id, updateData, userId) => {
    const game = await getGameByIdService(id);
    if (game.userCreatedId != userId)
        throw new UnauthorizedError('You cannot start the game');
    if (game.status === GameStatus.IN_PROGRESS)
        throw new ValidationError('Game has already stared');

    const attendees = await attendeeRepository.findAllByClause({gameId: id, status: UserStatus.READY});
    const totalAttendees = await attendeeRepository.count({ gameId: id});
    if (attendees.length !== totalAttendees)
        throw new ValidationError('Not all attendees are ready');
    updateData.status = GameStatus.IN_PROGRESS;
    await gameRepository.update(id, updateData);
    return game;
};


const deleteGameService = async(id) => {
    const game = await gameRepository.findById(id);
    if (game) {
        await gameRepository.delete(id);
        return true;
    }
    throw new Error('Game not found');
};

const endGameService = async(idGame, updateData, idUser) => {
    const game = await getGameByIdService(idGame);
    if (game.status != GameStatus.IN_PROGRESS)
        throw new ValidationError('Game is not in progress');
    if (game.userCreatedId != idUser)
        throw new UnauthorizedError('Only the creator can finish the game');
    updateData.status = GameStatus.FINISHED;
    await gameRepository.update(idGame, updateData);
    return game;
};

const getPlayersService = async(idGame) => {
    const attendees = await attendeeService.getPlayersGame(idGame);
    const players = await userPlayerRepository.findAllByIds(attendees);
    return players;
};

const getNextTurnService = async(idGame) => {
    const game = await getGameByIdService(idGame);
    if (game.status != GameStatus.IN_PROGRESS)
        throw new ValidationError('Game is not in progress');
    const userCurrent = await attendeeService.getUserNextTurn(game.id, game.currentTurn);
    const nroPlayers = await attendeeService.getNroPlayersJoined(game.id);
    if (game.currentTurn < nroPlayers)
        game.currentTurn += 1;
    else
        game.currentTurn = 1;
    await updateGameService(game.id, {currentTurn: game.currentTurn});
    return userCurrent;
};

export default {
    createGameService, 
    getGamesService,
    getGameByIdService,
    updateGameService,
    deleteGameService,
    startGameService,
    endGameService,
    getPlayersService,
    getNextTurnService
};