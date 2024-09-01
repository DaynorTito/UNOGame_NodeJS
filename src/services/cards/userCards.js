import { getCardsOfUserPlay, getDescriptionCards, userPlayersWithCards } from "../../utils/userPlayersCards.js";
import attendeeValidationService from "../validations/attendeeValidationService.js";
import { userExistGame, validateGameInProgress } from "../validations/gameValidationService.js";
import container from "../../config/container.js";

const attendeeRepository = container.resolve('attendeeRepository');


const getUserCards = async (player, gameId, user) => {
    await validateGameInProgress(gameId);
    await userExistGame(player, gameId);
    await attendeeValidationService.validateUserName(user, player);
    const cardsInPlay =  await getCardsOfUserPlay(user.id, gameId);
    return await getDescriptionCards(cardsInPlay);
};

const getAllHandUserGame = async (gameId) => {
    const attendees = await attendeeRepository.findAllByClause({ gameId });
    return await userPlayersWithCards(attendees, gameId);
};

export default {
    getUserCards,
    getAllHandUserGame
}