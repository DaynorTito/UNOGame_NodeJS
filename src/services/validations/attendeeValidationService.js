
import { ValidationError, AlreadyExistsError } from "../../errors/customError.js";
import container from "../../config/container.js";

const attendeeRepository = container.resolve('attendeeRepository');

const validateJoinGame = async (game, user) => {
    const existingAttendee = await attendeeRepository.findOneByClause({gameId: game.id, userId: user.id});
    if (existingAttendee)
      throw new AlreadyExistsError();

    const numberPlayerJoined = await attendeeRepository.count({gameId: game.id});
    if (numberPlayerJoined >= game.maxPlayers)
      throw new ValidationError('You cannot join, game is full');
};

export default {
  validateJoinGame
};