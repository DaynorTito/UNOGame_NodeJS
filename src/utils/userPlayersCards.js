import container from "../config/container.js";
import { CardStatus } from "./cardStatus.js";

const userPlayerRepository = container.resolve('userPlayerRepository'); 
const discardCards = container.resolve('discardCardRepository'); 
const cardRepository = container.resolve('cardRepository');

const userPlayersWithCards = async (attendees, idGame) => {
    const userIds = attendees.map(att => att.userId);
    const userPlayers = await userPlayerRepository.findAllByClause({id: userIds });
    const cardsInPlay = await discardCards.findAllByClause({ gameId: idGame });
    const cardDetails = await cardRepository.findAll();
    const players = prepareUserWithCards(attendees, userPlayers, cardsInPlay, cardDetails);
    return { players };
};

const prepareUserWithCards = (attendees, userPlayers, cards, cardDetails) => {
    const cardDescriptions = getDescriptionCards(cardDetails);
    return userPlayers.reduce((acc, userPlayer) => {
        const attendee = attendees.find(att => att.userId === userPlayer.id);
        if (attendee) {
            const playerCards = cards.filter(card => card.userId === userPlayer.id && card.state === CardStatus.IN_PLAY);
            const cardDescriptionsList = playerCards.map(card => cardDescriptions[card.cardId]);
            acc[userPlayer.username] = cardDescriptionsList;
        }
        return acc;
    }, {});
};

const getDescriptionCards = (cardDetails) => {
    return cardDetails.reduce((acc, card) => {
        acc[card.id] = `${card.color} ${card.value}`;
        return acc;
    }, {});
}

export {
    userPlayersWithCards
}
