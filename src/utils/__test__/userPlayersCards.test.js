import informationAttendee from '../../services/attendees/informationAttendee.js';
import { assignCardPlayer, getCardsDeckUnused, getCardsOfUserPlay, nextPlaterTurn, shuffleCards, userPlayersWithCards } from '../userPlayersCards.js';
import container from '../../config/container.js';
import { CardStatus } from '../cardStatus.js';
import calculateScores from '../../services/scores/calculateScores.js';
import gameStateService from '../../services/game/gameStateService.js';

const discardCards = container.resolve('discardCardRepository'); 
const cardRepository = container.resolve('cardRepository');
const userPlayerRepository = container.resolve('userPlayerRepository');

describe('userPlayersWithCards', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('should return players with their cards in play', async () => {
        const mockAttendees = [{ userId: '1' }, { userId: '2' }];
        const mockUserPlayers = [{ id: '1', username: 'User1' }, { id: '2', username: 'User2' }];
        const mockCardsInPlay = [{ userId: '1', cardId: '101', state: CardStatus.IN_PLAY }];
        const mockCardDetails = [{ id: '101', color: 'Red', value: '5' }];

        jest.spyOn(informationAttendee, 'getPlayersFromAttendees').mockResolvedValue(mockUserPlayers);
        jest.spyOn(discardCards, 'findAllByClause').mockResolvedValue(mockCardsInPlay);
        jest.spyOn(cardRepository, 'findAll').mockResolvedValue(mockCardDetails);

        const result = await userPlayersWithCards(mockAttendees, 'game1');
        expect(result.players.User1).toEqual(['Red 5']);
        expect(result.players.User2).toEqual([]);
    });

    it('should handle cases with no cards in play', async () => {
        const mockAttendees = [{ userId: '1' }, { userId: '2' }];
        const mockUserPlayers = [{ id: '1', username: 'User1' }, { id: '2', username: 'User2' }];
        const mockCardsInPlay = [];
        const mockCardDetails = [{ id: '101', color: 'Red', value: '5' }];

        jest.spyOn(informationAttendee, 'getPlayersFromAttendees').mockResolvedValue(mockUserPlayers);
        jest.spyOn(discardCards, 'findAllByClause').mockResolvedValue(mockCardsInPlay);
        jest.spyOn(cardRepository, 'findAll').mockResolvedValue(mockCardDetails);

        const result = await userPlayersWithCards(mockAttendees, 'game1');
        expect(result.players.User1).toEqual([]);
        expect(result.players.User2).toEqual([]);
    });

    it('should handle cases where some users have no cards', async () => {
        const mockAttendees = [{ userId: '1' }, { userId: '2' }];
        const mockUserPlayers = [{ id: '1', username: 'User1' }, { id: '2', username: 'User2' }];
        const mockCardsInPlay = [{ userId: '1', cardId: '101', state: CardStatus.IN_PLAY }];
        const mockCardDetails = [{ id: '101', color: 'Red', value: '5' }];

        jest.spyOn(informationAttendee, 'getPlayersFromAttendees').mockResolvedValue(mockUserPlayers);
        jest.spyOn(discardCards, 'findAllByClause').mockResolvedValue(mockCardsInPlay);
        jest.spyOn(cardRepository, 'findAll').mockResolvedValue(mockCardDetails);

        const result = await userPlayersWithCards(mockAttendees, 'game1');
        expect(result.players.User1).toEqual(['Red 5']);
        expect(result.players.User2).toEqual([]);
    });

    it('should handle cases with multiple cards for a player', async () => {
        const mockAttendees = [{ userId: '1' }];
        const mockUserPlayers = [{ id: '1', username: 'User1' }];
        const mockCardsInPlay = [
            { userId: '1', cardId: '101', state: CardStatus.IN_PLAY },
            { userId: '1', cardId: '102', state: CardStatus.IN_PLAY }
        ];
        const mockCardDetails = [
            { id: '101', color: 'Red', value: '5' },
            { id: '102', color: 'Blue', value: '10' }
        ];

        jest.spyOn(informationAttendee, 'getPlayersFromAttendees').mockResolvedValue(mockUserPlayers);
        jest.spyOn(discardCards, 'findAllByClause').mockResolvedValue(mockCardsInPlay);
        jest.spyOn(cardRepository, 'findAll').mockResolvedValue(mockCardDetails);

        const result = await userPlayersWithCards(mockAttendees, 'game1');
        expect(result.players.User1).toEqual(['Red 5', 'Blue 10']);
    });
});

describe('getCardsDeckUnused', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('should return unused cards', async () => {
        const mockDiscards = [{ cardId: '101' }, { cardId: '102' }];
        const mockAllCards = [
            { id: '101', color: 'Red', value: '5' },
            { id: '102', color: 'Blue', value: '10' },
            { id: '103', color: 'Green', value: '7' }
        ];
        const mockUnusedCards = [
            { id: '103', color: 'Green', value: '7' }
        ];

        jest.spyOn(discardCards, 'findAllByClause').mockResolvedValue(mockDiscards);
        jest.spyOn(cardRepository, 'findAllByClause').mockResolvedValue(mockUnusedCards);

        const result = await getCardsDeckUnused('game1');
        expect(result).toEqual(mockUnusedCards);
    });

    it('should return all cards if none are discarded', async () => {
        const mockDiscards = [];
        const mockAllCards = [
            { id: '101', color: 'Red', value: '5' },
            { id: '102', color: 'Blue', value: '10' }
        ];

        jest.spyOn(discardCards, 'findAllByClause').mockResolvedValue(mockDiscards);
        jest.spyOn(cardRepository, 'findAllByClause').mockResolvedValue(mockAllCards);

        const result = await getCardsDeckUnused('game1');
        expect(result).toEqual(mockAllCards);
    });
});

describe('shuffleCards', () => {
    it('should shuffle the cards', () => {
        const cards = [
            { id: '1', color: 'Red', value: '5' },
            { id: '2', color: 'Blue', value: '10' }
        ];

        const shuffled = shuffleCards(cards);
        expect(shuffled.length).toBe(cards.length);
        expect(shuffled).toEqual(expect.arrayContaining(cards));
    });
});

describe('assignCardPlayer', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('should assign a card to a player', async () => {
        const mockCard = { id: '101', color: 'Red', value: '5' };

        jest.spyOn(discardCards, 'create').mockResolvedValue(mockCard);

        await assignCardPlayer('game1', 'player1', mockCard);

        expect(discardCards.create).toHaveBeenCalledWith({
            gameId: 'game1',
            cardId: mockCard.id,
            userId: 'player1',
            state: CardStatus.IN_PLAY
        });
    });
});

describe('getCardsOfUserPlay', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('should return cards in play for a specific user', async () => {
        const mockCardsPlay = [{ cardId: '101' }];
        const mockCardDetails = [{ id: '101', color: 'Red', value: '5' }];

        jest.spyOn(discardCards, 'findAllByClause').mockResolvedValue(mockCardsPlay);
        jest.spyOn(cardRepository, 'findAllByClause').mockResolvedValue(mockCardDetails);

        const result = await getCardsOfUserPlay('user1', 'game1');
        expect(result).toEqual(mockCardDetails);
    });
});

describe('nextPlaterTurn', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('should return the winner if there is one', async () => {
        jest.spyOn(calculateScores, 'thereIsWinner').mockResolvedValue('winner');
        const result = await nextPlaterTurn('game1');
        expect(result).toBe('winner');
    });

    it('should return the next player username if there is no winner', async () => {
        jest.spyOn(calculateScores, 'thereIsWinner').mockResolvedValue(null);
        jest.spyOn(gameStateService, 'getNextTurnService').mockResolvedValue('player1');
        jest.spyOn(userPlayerRepository, 'findById').mockResolvedValue({ username: 'Player1' });

        const result = await nextPlaterTurn('game1');
        expect(result).toBe('Player1');
    });
});