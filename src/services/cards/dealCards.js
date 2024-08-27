import container from "../../config/container.js";
import { ValidationError } from "../../errors/customError.js";
import { CardStatus } from "../../utils/cardStatus.js";
import { userPlayersWithCards } from "../../utils/userPlayersCards.js";
import { validateGameInProgress } from "../validations/gameValidationService.js";

const gameRepository = container.resolve('gameRepository');
const cardRepository = container.resolve('cardRepository');
const attendeeRepository = container.resolve('attendeeRepository');
const discardCards = container.resolve('discardCardRepository'); 


const dealCardsPlayer = async (idGame, numberCards) => {
    const attendees = await attendeeRepository.findAllByClause({ gameId: idGame });

    if (!attendees || attendees.length === 0)
        throw new ValidationError('There are no players who joined the game');
    const topCard = await discardCards.findOneByClause({gameId: idGame, top: true});
    if(topCard)
        throw new ValidationError('Cards already dealt');

    await validateGameInProgress(idGame);
    const deck = await shuffleDeck();
    await distributeCards(attendees, deck, idGame, numberCards, 0);
    await putFirstCard(deck, idGame);

    const usersWithTheirCards = await userPlayersWithCards(attendees, idGame);
    return usersWithTheirCards;
};

const distributeCards = async (userPlayers, deck, idGame, numberCards, playerIndex) => {
    if (playerIndex >= userPlayers.length)
        return;
    const player = userPlayers[playerIndex];
    const playerCards = deck.splice(0, numberCards);

    await assignCardsToPlayer(idGame, player, playerCards, 0);
    await distributeCards(userPlayers, deck, idGame, numberCards, playerIndex + 1);
};

const assignCardsToPlayer = async (idGame, player, playerCards, cardIndex) => {
    if (cardIndex >= playerCards.length)
        return;
    const card = playerCards[cardIndex];
    await assignCardPlayer(idGame, player, card);
    await assignCardsToPlayer(idGame, player, playerCards, cardIndex + 1);
};

const assignCardPlayer = async (idGame, player, card) => {
    const createCard = await discardCards.create({
        gameId: idGame,
        cardId: card.id,
        userId: player.userId,
        state: CardStatus.IN_PLAY
    });
};

const shuffleDeck = async () => {
    const allCards = await cardRepository.findAll();
    const mixedDeck = allCards.sort(() => Math.random() - 0.5);
    return mixedDeck;
};

const putFirstCard = async (deck, idGame) => {
    const cardDeck = chooseCardToStart(deck);
    await discardCards.create({
        gameId: idGame,
        cardId: cardDeck.id,
        top: true,
        state: CardStatus.UNUSED
    });
};

const chooseCardToStart = (deck) => {
    const card = deck.pop();
    if (card.point >= 10)
        return chooseCardToStart(deck);
    return card;        
};

export default {
    dealCardsPlayer
}
