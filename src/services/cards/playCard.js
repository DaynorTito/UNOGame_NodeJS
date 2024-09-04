import container from "../../config/container.js";
import { ValidationError } from "../../errors/customError.js";
import { CardValues } from "../../utils/cardValues.js";
import { ActionValues } from "../../utils/actionValues.js"
import { convertToCardObject, getCardDescription, getCardListDescription } from "../../utils/formatCard.js";
import { CardStatus } from "../../utils/cardStatus.js";
import { CardDto } from "../../models/dto/CardDto.js";
import { userExistGame, validateGameInProgress, validateTurnPlayer } from "../validations/gameValidationService.js";
import { assignCardPlayer, getCardsDeckUnused, getCardsOfUserPlay, nextPlaterTurn, shuffleCards } from "../../utils/userPlayersCards.js";
import calculateScores from "../scores/calculateScores.js";
import { VarifyTopCard } from "../validations/cardsValidation.js";
import attendeeValidationService from "../validations/attendeeValidationService.js";
import movesRegister from "../history/movesRegister.js";
import playSpecialCard from "./playSpecialCard.js";

const discardCards = container.resolve('discardCardRepository');

const playCardPlayer = async (gameId, player, cardPlayed, user) => {
    const win = await beforePlayCard(user, player, gameId);
    if(win) return { nextStep: win.message, playerCurrent: win.scoresArray};
    const playerCurrent = await nextPlaterTurn(gameId);
    const nextStep = await getCardTopCurrentData(cardPlayed, user, gameId, player);
    return { nextStep, playerCurrent };
};

const beforePlayCard = async (user, player, gameId) => {
    attendeeValidationService.validateUserName(user, player);
    await validateGameInProgress(gameId);
    await VarifyTopCard(gameId);
    await validateTurnPlayer(gameId, user.id);
    const winner = await calculateScores.thereIsWinner(gameId);
    if (winner)
        return winner;
    return false;
};

const getCardPlayCurrent = async (cardPlayed, userId, gameId) => {
    const infoCard = convertToCardObject(cardPlayed);
    const discardCard = await discardCards.findAllByClause({gameId,userId, state: CardStatus.IN_PLAY});
    const cardsUser = await getCardListDescription(discardCard);
    const cardPlayer = cardsUser.find(card => card.value === infoCard.value && card.color === infoCard.color);
    if (!cardPlayer) throw new ValidationError("You do not have this card in your deck")
    return cardPlayer;
};

const getCardTopCurrentData = async (cardPlayed, user, gameId, player) => {
    const existTopCard = await discardCards.findOneByClause({ top: true });
    const cardPlay = await getCardPlayCurrent(cardPlayed, user.id, gameId);
    const topCard = await getCardDescription(existTopCard.cardId);
    return await nextStepPlay(gameId, topCard, cardPlay, player);
};

const nextStepPlay = async (gameId, topCard, cardPlay, player) => {
    verifyCard(topCard, cardPlay);
    if (playSpecialCard.isSpecial(cardPlay)) 
        return playSpecialCard.espcialCard(gameId, topCard, cardPlay, player);
    await playSpecialCard.espcialCard(gameId, topCard, cardPlay, player);
    await updatePlayCard({gameId, cardId: topCard.id}, false, CardStatus.USED);
    const newTop = await updatePlayCard({gameId, cardId: cardPlay.id}, true, CardStatus.UNUSED);
    const cardInf =  await getCardDescription(newTop.cardId);
    await movesRegister.registerMove(gameId, ActionValues.PLAY_CARD + cardPlay.color + cardPlay.value, player);
    const respCard = new CardDto(cardInf);
    return respCard.getCard();
};

const updateFields = (card, top, state) => ({
    ...card,
    top,
    state
});

const updatePlayCard = async (whereClause, top, state) => {
    const cardToUpdate = await discardCards.findOneByClause(whereClause);
    const updatedCard = updateFields(cardToUpdate, top, state);
    return await discardCards.update(cardToUpdate.id, updatedCard);
};

const verifyCard = (topCard, cardPlayed) => {
    const isValid = isValidCard(topCard)(cardPlayed);
    if (!isValid)
        throw new ValidationError("Invalid card, play a card that matches the top card");
    return isValid;
};

const getLastCard = async (gameId) => {
    await validateGameInProgress(gameId);
    const card = await discardCards.findOneByClause({gameId, top: true});
    if (!card)
        throw new ValidationError("You must deal cards first");
    const cardInf = await getCardDescription(card.cardId);
    const gameFormat = new CardDto(cardInf);
    return gameFormat.getCard();
};

const findValidCards = (cards, topCard) => 
    cards.filter(card => isValidCard(topCard)(card));
  
function* validCardGenerator(cards, topCard) {
    yield* findValidCards(cards, topCard);
}

const drawnCard = async (gameId, player, user) => {
    const win = await beforePlayCard(user, player, gameId);
    if(win) return { cardDrawn: win.message, playerCurrent: win.scoresArray};
    if(await verifyAvailabilityCard(user.id, gameId)) throw new ValidationError("You should use a card of your hand");
    const unusedCards = await getCardsDeckUnused(gameId);
    const playerCurrent = await nextPlaterTurn(gameId);
    const cardDrawn = await drawnUnused(gameId, user.id, unusedCards)
    return { cardDrawn, playerCurrent };
};

const drawnUnused = async (idGame, userId, unusedCards) => {
    const shuffle = shuffleCards(unusedCards);
    const cardToAdd = shuffle.pop();
    await assignCardPlayer(idGame, userId, cardToAdd);
    const responseCard = new CardDto(cardToAdd);
    return responseCard.getCard();
};

const verifyAvailabilityCard = async (userId, gameId) => {
    const existTopCard = await discardCards.findOneByClause({ top: true });
    const topCard = await getCardDescription(existTopCard.cardId);
    const userCards = await getCardsOfUserPlay(userId, gameId);
    return userCards.some((element) => isValidCard(topCard)(element));
};


const checkColor = (topCardColor) => (card) => card.color === topCardColor;

const checkValue = (topCardValue) => (card) => card.value === topCardValue;

const checkWild = () => (cardValue) => cardValue === CardValues.WILD;

const isValidCard = (topCard) => (card) =>
    checkWild()(card.value) || checkColor(topCard.color)(card) || checkValue(topCard.value)(card);

export default {
    playCardPlayer,
    drawnCard,
    getLastCard,
    beforePlayCard,
    getCardTopCurrentData,
    updatePlayCard,
    verifyAvailabilityCard,
    getCardPlayCurrent
}