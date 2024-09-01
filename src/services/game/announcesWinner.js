import container from "../../config/container.js";
import { ValidationError } from "../../errors/customError.js";
import { ActionValues } from "../../utils/actionValues.js";
import { assignCardPlayer, getCardsDeckUnused, shuffleCards } from "../../utils/userPlayersCards.js";
import attendeeValidationService from "../validations/attendeeValidationService.js";
import { userExistGame } from "../validations/gameValidationService.js";

const attendeRepository = container.resolve('attendeeRepository'); 

const sayUno = async (user, gameId, action, player) => {
    attendeeValidationService.validateUserName(user, player);
    const attendee = await verifyUserSawUno(user.id, gameId);
    if (validateAction(action, ActionValues.SAY_UNO)) {
        const updatedAttendee = updateFields(attendee, true);
        const attendeeSawUno = await attendeRepository.update(attendee.id, updatedAttendee);
    }
    return user.username;
};

const updateFields = (attendee, sayUno) => ({
    ...attendee,
    sayUno
});

const validateAction = (action, actionValidate) => {
    if (action != actionValidate)
        throw new ValidationError("Invalid Action");
    return true;
};

const verifyUserSawUno = async (userId, gameId) => {
    const attendee = await attendeRepository.findOneByClause({userId, gameId});
    if (!attendee)
        throw new ValidationError("User doesnt exist in this game");
    if (attendee.sayUno)
        throw new ValidationError("User already say UNO");
    return attendee;
};

const challengedPlayer = async (challenger, challengedPlayer, gameId, user) => {
    validateUserName(user, challenger);
    const userChallenger = await userExistGame(challenger, gameId);
    const userChallenged = await userExistGame(challengedPlayer, gameId);
    await playerSawUno(userChallenged, gameId);
    await drewTwoCards(userChallenged, gameId);
};

const playerSawUno = async(userChallenged, gameId) =>{
    const attendee = await attendeRepository.findOneByClause({gameId, userId: userChallenged.id});
    if(attendee.sayUno)
        throw new ValidationError("Challenged User saw UNO");
};

const drewTwoCards = async (userToAdd, gameId) => {
    const cardsUnused = await getCardsDeckUnused(gameId);
    const shuffleCard = shuffleCards(cardsUnused);
    await assignCardPlayer(gameId, userToAdd.id, shuffleCard.pop());
    await assignCardPlayer(gameId, userToAdd.id, shuffleCard.pop());
};

export default {
    sayUno,
    challengedPlayer
};
