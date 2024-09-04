import container from "../../config/container.js";
import { UserDto } from "../../models/dto/UserDto.js";
import { CardValues } from "../../utils/cardValues.js";
import { getCardsDeckUnused } from "../../utils/userPlayersCards.js";
import gameStateService from "../game/gameStateService.js";

const gameRepository = container.resolve('gameRepository');
const userPlayerRepository = container.resolve('userPlayerRepository');


const espcialCard = async (gameId, topCard, cardPlay, player) => {
    if (verifySpecial(CardValues.SKIP, cardPlay)) {
        return await playSkipCard(gameId);
    } else if (verifySpecial(CardValues.DRAW_TWO, cardPlay)) {
        return await playDrawTwoCard(gameId, user);
    } else if (verifySpecial(CardValues.REVERSE, cardPlay)) {
        return await playReverse(gameId);
    }
};

const isSpecial = (cardPlay) => {
    const isSkip = verifySpecial(CardValues.SKIP, cardPlay);
    const isDrawTwo = verifySpecial(CardValues.DRAW_TWO, cardPlay);
    const isReverse = verifySpecial(CardValues.REVERSE, cardPlay);
    return isSkip || isDrawTwo || isReverse;
};

const playReverse = async (gameId) => {
    const gameToUpdate = await gameRepository.findById(gameId);
    const valueWay = gameToUpdate.clockwise ? false : true;
    const updatedGame = updateFields(gameToUpdate, valueWay);
    await gameRepository.update(gameToUpdate.id, updatedGame);
    return {message: 'Reversed direction '};

};

const updateFields = (game, clockwise) => ({
    ...game,
    clockwise
});

const playSkipCard = async (gameId) => {
    const idCurrentUser = await gameStateService.getNextTurnService(gameId);
    return {message: 'User skiped: ', user: await retrieveFormatUser(idCurrentUser)};
};

const retrieveFormatUser = async (idUser) => {
    const user = await userPlayerRepository.findById(idUser);
    const dtoUser = new UserDto(user);
    return dtoUser.getUser();
};

const playDrawTwoCard = async (gameId) => {
    const idCurrentUser = await gameStateService.getNextTurnService(gameId);
    const unusedCards1 = await getCardsDeckUnused(gameId);
    const cardDrawn1 = await drawnUnused(gameId, idCurrentUser, unusedCards1);
    const unusedCards2 = await getCardsDeckUnused(gameId);
    const cardDrawn2 = await drawnUnused(gameId, idCurrentUser, unusedCards2);
    console.log(cardDrawn1, cardDrawn2, "AAADEEDD to user: ", idCurrentUser)
    return {message: 'Following cards have been added to ', usertoAdd: retrieveFormatUser(idCurrentUser),
        cardDrawn1, cardDrawn2
    };
};

const verifySpecial = (cardValue, card) => {
    return checkValue(cardValue)(card);
};

const checkValue = (topCardValue) => (card) => card.value === topCardValue;

export default {
    espcialCard,
    isSpecial
}
