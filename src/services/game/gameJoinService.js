

import { ValidationError } from "../../errors/customError.js";
import container from "../../config/container.js";
import attendeeValidationService from "../validations/attendeeValidationService.js";
import {UserStatus} from "../../utils/userStatus.js";
import {GameStatus} from "../../utils/gameStatus.js";

const attendeeRepository = container.resolve('attendeeRepository');
const gameRepository = container.resolve('gameRepository');

const joinGame = async (attendeeData, user) => {
    const game = await gameRepository.findById(attendeeData.gameId);
    if (!game) throw new ValidationError('Game does not exist');
    if (game.status == GameStatus.IN_PROGRESS) throw new ValidationError('Game already start');
    await attendeeValidationService.validateJoinGame(game, user);

    const numberPlayerJoined = await getNumberPlayersJoined(game.id);
    attendeeData.userId = user.id;
    attendeeData.turn = numberPlayerJoined + 1;
    
    return await attendeeRepository.create(attendeeData);
};


const leaveAttendee = async(idGame, idUser) => {

    const game = await gameRepository.findOneByClause({ id: idGame, status: GameStatus.IN_PROGRESS });
    if (!game)
        throw new ValidationError('Game not found or not active');
    
    const attendee = await attendeeRepository.findOneByClause({ gameId: idGame, userId: idUser });
    if (!attendee) 
        throw new ValidationError('User is not a player in this game');

    await attendee.destroy();
    return true;
};

const markAsReady = async (idGame, idUser) => {
    const attendee = await attendeeRepository.findOneByClause({ gameId: idGame, userId: idUser});
    if (!attendee || attendee.status === UserStatus.READY)
      throw new ValidationError('Is not part of the game or already is ready');
    const updateData = { status: UserStatus.READY };
    return await attendeeRepository.update(attendee.id, updateData);
};

const getNumberPlayersJoined = async (idGame) => {
    const attendees = await attendeeRepository.findAllByClause({ gameId: idGame });
    return attendees.length;
};

export default {
    joinGame,
    leaveAttendee,
    markAsReady
}