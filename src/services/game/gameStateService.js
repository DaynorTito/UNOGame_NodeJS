import { ValidationError } from "../../errors/customError.js";
import container from "../../config/container.js";
import gameService from "../gameService.js";
import { GameStatus } from "../../utils/gameStatus.js";
import { validateGameEnd, validateGameStart, validateGameTurn } from "../validations/gameValidationService.js";

const attendeeRepository = container.resolve('attendeeRepository');
const userPlayerRepository = container.resolve('userPlayerRepository');
const gameRepository = container.resolve('gameRepository');

const getPlayersGame = async (idGame) => {
    const attendees = await attendeeRepository.findAllByClause({ gameId: idGame });
    if (attendees.length === 0)
      throw new ValidationError('There are no players in this game');
    const userIds = attendees.map(attendee => attendee.userId);
    return userIds;
};

const getUserNextTurn = async (idGame, turn) => {
    const attendee = await attendeeRepository.findOneByClause({ gameId: idGame, turn: turn});
    return attendee;
};

const startGameService = async (id, updateData, userId) => {
    const game = await gameService.getGameByIdService(id);
    await validateGameStart(game, userId);
    updateData.status = GameStatus.IN_PROGRESS;
    await gameRepository.update(id, updateData);
    return game;
};

const endGameService = async(idGame, updateData, idUser) => {
    const game = await gameService.getGameByIdService(idGame);
    await validateGameEnd(game, idUser);
    updateData.status = GameStatus.FINISHED;
    await gameRepository.update(idGame, updateData);
    return game;
};

const getPlayersService = async(idGame) => {
    const attendees = await getPlayersGame(idGame);
    const players = await userPlayerRepository.findAllByIds(attendees);
    return players;
};

const getNextTurnService = async(idGame) => {
    const game = await gameService.getGameByIdService(idGame);
    const userCurrent = await validateGameTurn(game);
    const nroPlayers = await getNroPlayersJoined(idGame);
    game.currentTurn = game.currentTurn < nroPlayers ? game.currentTurn + 1 : 1;
    await gameService.updateGameService(game.id, {currentTurn: game.currentTurn});
    return userCurrent.userId;
};

const getNroPlayersJoined = async (idGame) => {
    return await attendeeRepository.count({ gameId: idGame });
};

export default {
    getPlayersGame,
    getUserNextTurn,
    startGameService,
    endGameService,
    getPlayersService,
    getNextTurnService
}