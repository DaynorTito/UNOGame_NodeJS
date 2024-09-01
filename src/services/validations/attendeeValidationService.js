
import { ValidationError, AlreadyExistsError, UnauthorizedError } from "../../errors/customError.js";
import container from "../../config/container.js";

const attendeeRepository = container.resolve('attendeeRepository');
const userPlayerRepository = container.resolve('userPlayerRepository');

const validateJoinGame = async (game, user) => {
    const existingAttendee = await attendeeRepository.findOneByClause({gameId: game.id, userId: user.id});
    if (existingAttendee)
      throw new AlreadyExistsError();

    const numberPlayerJoined = await attendeeRepository.count({gameId: game.id});
    if (numberPlayerJoined >= game.maxPlayers)
      throw new ValidationError('You cannot join, game is full');
};

const validateUserExist = async (userId) => {
    const user = await userPlayerRepository.findById(userId);
    if(!user)
      throw new ValidationError("Token acces invalid or user not registered");
};

const validateUserName = (user, player) => {
  const userName = user.username;
  if (userName!= player)
      throw new UnauthorizedError("Your username does not match");
};

export default {
  validateJoinGame,
  validateUserExist,
  validateUserName
};