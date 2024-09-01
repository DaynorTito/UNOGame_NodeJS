import { ValidationError, UnauthorizedError } from "../../errors/customError.js";
import { GameStatus } from "../../utils/gameStatus.js";
import { UserStatus } from "../../utils/userStatus.js";
import container from "../../config/container.js";
import gameStateService from "../game/gameStateService.js";
import calculateScores from "../scores/calculateScores.js";

const attendeeRepository = container.resolve('attendeeRepository');
const gameRepository = container.resolve('gameRepository');
const userPlayerRepository = container.resolve('userPlayerRepository');

export const validateGameStart = async (game, userId) => {
    if (game.userCreatedId !== userId)
        throw new UnauthorizedError('You cannot start the game');
    if (game.status === GameStatus.IN_PROGRESS)
        throw new ValidationError('Game has already started');

    const attendees = await attendeeRepository.findAllByClause({gameId: game.id, status: UserStatus.READY});
    const totalAttendees = await attendeeRepository.count({ gameId: game.id});
    if (attendees.length !== totalAttendees)
        throw new ValidationError('Not all attendees are ready');
};

export const validateGameEnd = async (game, userId) => {
    await validateGameInProgress(game.id);
    if (game.userCreatedId !== userId)
        throw new UnauthorizedError('Only the creator can finish the game');
};

export const validateMaxPlayers = (maxPlayers) => {
    if (maxPlayers < 2 || maxPlayers > 10)
        throw new ValidationError("Max players value invalid, you can create a game with 2 to 10 players");
};

export const validateGameTurn = async (game)=> {
    await validateGameInProgress(game.id);
    const userCurrent = await gameStateService.getUserNextTurn(game.id, game.currentTurn);
    if (!userCurrent)
        throw new ValidationError('There are not any players in this game');
    return userCurrent;
};

export const validateGameInProgress = async (idGame) => {
    const game = await gameRepository.findById(idGame);
    if (game.status != GameStatus.IN_PROGRESS)
        throw new ValidationError('Game is not in progress');
};

export const userExistGame = async (username, gameId) => {
    const user = await userPlayerRepository.findOneByClause({username});
    if (!user)
        throw new ValidationError("User doesnt exist");
    const attendee = await attendeeRepository.findOneByClause({gameId, userId: user.id});
    if (!attendee)
        throw new ValidationError("User is not in game");
    return user;
};

export const validateTurnPlayer = async (gameId, userId) => {
    const game = await gameRepository.findById(gameId);
    if(!game)
        throw new ValidationError("Game doesnt exist");
    const attendee = await attendeeRepository.findOneByClause({gameId, userId});
    if(attendee.turn != game.currentTurn)
        throw new ValidationError("it is not your turn");
};

export const validateWinner = async (gameId)=> {
    const winner = await calculateScores.thereIsWinner(gameId);
    if(winner)
        throw new ValidationError("Game doesnt exist");
};

