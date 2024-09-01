import container from '../../../config/container.js';
import { ValidationError } from '../../../errors/customError.js';
import { CardStatus } from '../../../utils/cardStatus.js';
import * as userPlayersCards from '../../../utils/userPlayersCards.js';

import { validateGameInProgress } from '../../validations/gameValidationService.js';
import dealCards from '../../cards/dealCards.js';

const cardRepository = container.resolve('cardRepository');
const attendeeRepository = container.resolve('attendeeRepository');
const discardCards = container.resolve('discardCardRepository');

describe('dealCardsPlayer', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('should deal cards to players and return their cards', async () => {
        const mockAttendees = [{ userId: '1' }, { userId: '2' }];
        const mockDeck = [
            { id: '101', color: 'Red', value: '5', point: 5 },
            { id: '102', color: 'Blue', value: '10', point: 10 },
            { id: '103', color: 'Green', value: '7', point: 7 }
        ];
        const mockShuffledDeck = mockDeck.slice().reverse();
        const mockPlayerCards = [
            [{ id: '101', color: 'Red', value: '5' }, { id: '102', color: 'Blue', value: '10' }],
            [{ id: '103', color: 'Green', value: '7' }]
        ];
        const mockFirstCard = { id: '103', color: 'Green', value: '7' };
        const mockUserPlayersWithCards = { players: { User1: ['Red 5', 'Blue 10'], User2: ['Green 7'] } };

        jest.spyOn(attendeeRepository, 'findAllByClause').mockResolvedValue(mockAttendees);
        jest.spyOn(discardCards, 'findOneByClause').mockResolvedValue(null);
        jest.spyOn(require('../../../services/validations/gameValidationService.js'), 'validateGameInProgress').mockResolvedValue();
        jest.spyOn(cardRepository, 'findAll').mockResolvedValue(mockDeck);
        jest.spyOn(userPlayersCards, 'userPlayersWithCards').mockResolvedValue(mockUserPlayersWithCards);
        jest.spyOn(discardCards, 'create').mockResolvedValue();     

        const result = await dealCards.dealCardsPlayer('game1', 1);

        expect(attendeeRepository.findAllByClause).toHaveBeenCalledWith({ gameId: 'game1' });
        expect(discardCards.findOneByClause).toHaveBeenCalledWith({ gameId: 'game1', top: true });
        expect(validateGameInProgress).toHaveBeenCalledWith('game1');
        expect(cardRepository.findAll).toHaveBeenCalled();
        expect(result).toEqual(mockUserPlayersWithCards);
    });

    it('should throw an error if no attendees are found', async () => {
        jest.spyOn(attendeeRepository, 'findAllByClause').mockResolvedValue([]);
        
        await expect(dealCards.dealCardsPlayer('game1', 2)).rejects.toThrow(new ValidationError('There are no players who joined the game'));
    });

    it('should throw an error if cards are already dealt', async () => {
        const mockTopCard = { id: '101', color: 'Red', value: '5' };
        jest.spyOn(attendeeRepository, 'findAllByClause').mockResolvedValue([{ userId: '1' }]);
        jest.spyOn(discardCards, 'findOneByClause').mockResolvedValue(mockTopCard);
        
        await expect(dealCards.dealCardsPlayer('game1', 2)).rejects.toThrow(new ValidationError('Cards already dealt'));
    });

    it('should handle errors from the card repository', async () => {
        jest.spyOn(attendeeRepository, 'findAllByClause').mockResolvedValue([{ userId: '1' }]);
        jest.spyOn(discardCards, 'findOneByClause').mockResolvedValue(null);
        jest.spyOn(require('../../../services/validations/gameValidationService.js'), 'validateGameInProgress').mockResolvedValue();
        jest.spyOn(cardRepository, 'findAll').mockRejectedValue(new Error('Database error'));

        await expect(dealCards.dealCardsPlayer('game1', 2)).rejects.toThrow('Database error');
    });
});

describe('distributeCards', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    describe('assignCardsToPlayer', () => {
        beforeEach(() => {
            jest.resetAllMocks();
        });
    
        it('should assign cards to a player', async () => {
            const mockCard = { id: '101', color: 'Red', value: '5' };
    
            jest.spyOn(userPlayersCards, 'assignCardPlayer').mockResolvedValue();
            await dealCards.assignCardsToPlayer('game1', { userId: '1' }, [mockCard], 0);
    
            expect(userPlayersCards.assignCardPlayer).toHaveBeenCalledWith('game1', '1', mockCard);
        });
    });
});

describe('assignCardsToPlayer', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('should assign cards to a player', async () => {
        const mockCard = { id: '101', color: 'Red', value: '5' };

        jest.spyOn(userPlayersCards, 'assignCardPlayer').mockResolvedValue();

        await dealCards.assignCardsToPlayer('game1', { userId: '1' }, [mockCard], 0);

        expect(userPlayersCards.assignCardPlayer).toHaveBeenCalledWith('game1', '1', mockCard);
    });
});