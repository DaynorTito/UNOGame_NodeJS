import { ValidationError, UnauthorizedError } from "../../errors/customError.js";
import { GameStatus } from "../../utils/gameStatus.js";
import { UserStatus } from "../../utils/userStatus.js";
import container from "../../config/container.js";
import gameStateService from "../game/gameStateService.js";

const attendeeRepository = container.resolve('attendeeRepository');


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
    if (game.status !== GameStatus.IN_PROGRESS)
        throw new ValidationError('Game is not in progress');
    if (game.userCreatedId !== userId)
        throw new UnauthorizedError('Only the creator can finish the game');
};

export const validateGameTurn = async (game)=> {
    if (game.status != GameStatus.IN_PROGRESS)
        throw new ValidationError('Game is not in progress');
    const userCurrent = await gameStateService.getUserNextTurn(game.id, game.currentTurn);
    if (!userCurrent)
        throw new ValidationError('There are not any players in this game');
    return userCurrent;
};