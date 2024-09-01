import container from "../config/container.js";
import gameStateService from "../services/game/gameStateService.js";
import informationAttendee from "../services/attendees/informationAttendee.js";
import { CardStatus } from "./cardStatus.js";
import { Op } from "sequelize";
import calculateScores from "../services/scores/calculateScores.js";

const userPlayerRepository = container.resolve('userPlayerRepository'); 
const discardCards = container.resolve('discardCardRepository'); 
const cardRepository = container.resolve('cardRepository');

const userPlayersWithCards = async (attendees, idGame) => {
    const userPlayers = await informationAttendee.getPlayersFromAttendees(attendees);
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
};

const getCardsDeckUnused = async (gameId) => {
    const discards = await discardCards.findAllByClause({gameId});
    const usedCardIds = discards.map(discard => discard.cardId);
    return await cardRepository.findAllByClause({id: {[Op.notIn]: usedCardIds}});
};

const shuffleCards = (cards) => {
    const mixedDeck = cards.sort(() => Math.random() - 0.5);
    return mixedDeck;
};

const assignCardPlayer = async (idGame, playerId, card) => {
    const createCard = await discardCards.create({
        gameId: idGame,
        cardId: card.id,
        userId: playerId,
        state: CardStatus.IN_PLAY
    });
};

const getCardsOfUserPlay = async (userId, gameId) => {
    const cardsPlay = await discardCards.findAllByClause({userId,gameId, state: CardStatus.IN_PLAY});
    const cardsUserIds = cardsPlay.map(element => element.cardId);
    return  await cardRepository.findAllByClause({id: cardsUserIds});
};

const nextPlaterTurn = async(gameId) => {
    const winner = await calculateScores.thereIsWinner(gameId);
    if (winner) {
        return winner;
    }
    const idNextPlayer = await gameStateService.getNextTurnService(gameId);
    const player = await userPlayerRepository.findById(idNextPlayer);
    return player.username;
};

export {
    userPlayersWithCards,
    getCardsDeckUnused,
    shuffleCards,
    assignCardPlayer,
    getCardsOfUserPlay,
    nextPlaterTurn,
    getDescriptionCards
}
