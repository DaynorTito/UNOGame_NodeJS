import container from "../../config/container.js";
import { UnauthorizedError, ValidationError } from "../../errors/customError.js";
import { CardValues } from "../../utils/cardValues.js";
import { convertToCardObject, getCardDescription, getCardListDescription } from "../../utils/formatCard.js";
import { CardStatus } from "../../utils/cardStatus.js";
import { CardDto } from "../../models/dto/CardDto.js";

const discardCards = container.resolve('discardCardRepository'); 

const playCardPlayer = async (gameId, player, cardPlayed, user) => {
    if (user.username != player)
        throw new UnauthorizedError("You cannot play another user's cards");
    const existTopCard = await discardCards.findOneByClause({top: true});
    if (!existTopCard)
        throw new ValidationError("Must deal the cards first");
    const cardPlay = await getCardPlayCurrent(cardPlayed, user.id, gameId);
    const topCard = await getCardDescription(existTopCard.cardId);
    return await nextStepPlay(gameId, topCard, cardPlay);
};

const getCardPlayCurrent = async (cardPlayed, userId, gameId) => {
    const infoCard = convertToCardObject(cardPlayed);
    const discardCard = await discardCards.findAllByClause({gameId,userId, state: CardStatus.IN_PLAY});
    const cardsUser = await getCardListDescription(discardCard);
    const cardPlayer = cardsUser.find(card => card.value === infoCard.value && card.color === infoCard.color);
    if (!cardPlayer) throw new ValidationError("You do not have this card in your deck")
    return cardPlayer;
};

const nextStepPlay = async (gameId, topCard, cardPlay) => {
    verifyCard(topCard, cardPlay);
    await updatePlayCard({gameId, cardId: topCard.id}, false, CardStatus.USED);
    const newTop = await updatePlayCard({gameId, cardId: cardPlay.id}, true, CardStatus.UNUSED);
    const cardInf =  await getCardDescription(newTop.cardId);

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

const checkColor = (topCardColor) => (card) => card.color === topCardColor;

const checkValue = (topCardValue) => (card) => card.value === topCardValue;

const checkWild = () => (cardValue) => cardValue === CardValues.WILD;

const isValidCard = (topCard) => (card) =>
    checkWild()(card.value) || checkColor(topCard.color)(card) || checkValue(topCard.value)(card);

export default {
    playCardPlayer
}