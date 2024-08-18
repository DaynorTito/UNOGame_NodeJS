import Attendee from "../models/attendee.js";
import { AlreadyExistsError, NotFoundError, ValidationError } from "../errors/customError.js";
import { getGameByIdService } from "./gameService.js";
import { UserStatus } from "../utils/userStatus.js"
import Game from "../models/game.js";

const createAttendeeService = async (attendeeData, user) => {
    const game = await getGameByIdService(attendeeData.gameId);
    if (!game)
        throw new ValidationError('Game does not exist');
    const existingAttendee = await Attendee.findOne({where: {gameId: attendeeData.gameId, userId: user.id}});
    if (existingAttendee)
        throw new AlreadyExistsError();
    const numberPlayerJoined = await getNroPlayersJoined(game.id);
    if (numberPlayerJoined >= game.maxPlayers)
        throw new ValidationError('You cannot join, game is full');
    attendeeData.userId = user.id;
    attendeeData.turn = numberPlayerJoined + 1;
    return await Attendee.create(attendeeData);
};

const getAttendeesService = async () => {
    return await Attendee.findAll();
};

const getAttendeeByIdService = async (id) => {
    return await Attendee.findByPk(id);
};

const updateAttendeeService = async (id, updateData) => {
    const attendee = await Attendee.findByPk(id);
    
    if (attendee) {
      await attendee.update(updateData);
      return attendee;
    }
    throw new NotFoundError('Attendee not found');
  };

const deleteAttendeeService = async(id) => {
    const attendee = await Attendee.findByPk(id);
    if (attendee) {
        await attendee.destroy();
        return true;
    }
    throw new Error('Attendee not found');
};

const leaveAttendeeService = async(idGame, idUser) => {
    const game = await Game.findOne({ where: { id: idGame, status: 'active' } });
    if (!game)
        throw new ValidationError('Game not found or not active');
    
    const attendee = await Attendee.findOne({ where: { gameId: idGame, userId: idUser } });
    if (!attendee) 
        throw new ValidationError('User is not a player in this game');

    await attendee.destroy();
    return true;
};

const markAsReady =  async(idGame, idUser) => {
    const attendee = await Attendee.findOne({where: { gameId: idGame, userId: idUser}});
    if (!attendee || attendee.status === UserStatus.READY)
        throw new ValidationError('Is not part of the game or already is ready');
    const updateData = { status: UserStatus.READY };
    return await updateAttendeeService(attendee.id, updateData);
};

const getPlayersGame = async(idGame) => {
    const attendees = await Attendee.findAll({where: { gameId: idGame }}); 
    if (attendees.length === 0)
        throw new ValidationError('There are no players in this game');
    const userIds = attendees.map(attendee => attendee.userId);
    return userIds;
};

const getNroPlayersJoined = async(idGame) => {
    const attendees = await Attendee.findAll({where: { gameId: idGame }});
    return attendees.length;
};

const getUserNextTurn =  async(idGame, turn) => {
    const attendee = await Attendee.findOne({where: { gameId: idGame, turn: turn}});
    return attendee.userId;
};

export {createAttendeeService, 
    getAttendeesService,
    getAttendeeByIdService,
    updateAttendeeService,
    deleteAttendeeService,
    leaveAttendeeService,
    getPlayersGame,
    getNroPlayersJoined,
    getUserNextTurn,
    markAsReady
};
