import container from "../../../config/container.js";
import playCard from "../../../services/cards/playCard.js";
import * as formatCard from "../../../utils/formatCard.js"
import { ValidationError } from "../../../errors/customError.js";
import gameStateService from "../../game/gameStateService.js";
import { CardStatus } from "../../../utils/cardStatus.js";
import calculateScores from "../../../services/scores/calculateScores.js";
import movesRegister from "../../../services/history/movesRegister.js";
import { getCardDescription } from "../../../utils/formatCard.js";

const discardCards = container.resolve('discardCardRepository');
const gameRepository = container.resolve('gameRepository');
const attendeeRepository = container.resolve('attendeeRepository');
const userPlayerRepository = container.resolve('userPlayerRepository');

describe('playCardPlayer', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('should return win message if a winner is detected', async () => {
        const mockUser = { id: '1', username: 'player1', turn: 2};
        const mockUsers = [{ userId: '1', username: 'player1', turn: 2}, { userId: '2', username: 'player2', turn: 3}];
        const mockPlayer = 'player1';
        const mockGameId = 'game1';
        const mockWin = { message: 'Player1 wins!', scoresArray: [100] };
        const mockGame = { status: 'in progress', currentTurn: 2};
        const mockCard = { color: 'green', value: '2', point: 10};
        const mockCards = [{ color: 'green', value: '2', point: 10}, { color: 'green', value: '1',point: 10}, { color: 'green', value: '6',point: 10 }];
        const mockTop = { color: 'green', value: '2', point: 10};
        jest.spyOn(playCard, 'beforePlayCard').mockResolvedValue(false);
        jest.spyOn(gameRepository, 'findById' ).mockResolvedValue(mockGame);
        jest.spyOn(discardCards, 'findOneByClause' ).mockResolvedValue(mockCard);
        jest.spyOn(discardCards, 'update' ).mockResolvedValue(mockCard)
        jest.spyOn(attendeeRepository, 'findOneByClause').mockResolvedValue(mockUser);
        jest.spyOn(attendeeRepository, 'findAllByClause').mockResolvedValue(mockUsers);
        jest.spyOn(gameRepository, 'update').mockResolvedValue(mockGame);
        jest.spyOn(gameStateService, 'getPlayersGame').mockResolvedValue(['1', '2']);

        jest.spyOn(require('../../../services/validations/gameValidationService.js'), 'validateGameInProgress').mockResolvedValue();
        jest.spyOn(require('../../../services/validations/gameValidationService.js'), 'validateTurnPlayer').mockResolvedValue();
        jest.spyOn(require('../../../services/validations/cardsValidation.js'), 'VarifyTopCard').mockResolvedValue();

        jest.spyOn(userPlayerRepository, 'findById').mockResolvedValue(mockUser);
        jest.spyOn(userPlayerRepository, 'findOneByClause').mockResolvedValue(mockUser);
        jest.spyOn(formatCard, 'getCardListDescription').mockResolvedValue(mockCards);
        jest.spyOn(formatCard, 'getCardDescription').mockResolvedValue(mockTop);

        const result = await playCard.playCardPlayer(mockGameId, mockPlayer, "green 2", mockUser);
        expect(result).toEqual({ nextStep: mockWin.message, playerCurrent: mockWin.scoresArray });
    });

    it('should continue the game if no winner is detected', async () => {
        const mockUser = { id: '1' , username: 'player1'};
        const mockUsers = [{ userId: '1', username: 'player1', turn: 2}, { userId: '2', username: 'player2', turn: 3}];
        const mockPlayer = 'player1';
        const mockGameId = 'game1';
        const mockNextStep = 'Card description';
        const mockPlayerCurrent = 'Next player';
        const mockCard = { color: 'green', value: '2', point: 10};
        const mockCards = [{ color: 'green', value: '2', point: 10}, { color: 'green', value: '1',point: 10}, { color: 'green', value: '6',point: 10 }];
        const mockTop = { color: 'green', value: '2', point: 10};


        jest.spyOn(playCard, 'beforePlayCard').mockResolvedValue(false);

        jest.spyOn(attendeeRepository, 'findAllByClause').mockResolvedValue(mockUsers);
        jest.spyOn(require('../../../services/validations/gameValidationService.js'), 'validateTurnPlayer').mockResolvedValue();
        jest.spyOn(require('../../../utils/userPlayersCards.js'), 'nextPlaterTurn').mockResolvedValue(mockPlayerCurrent);
        jest.spyOn(require('../../../services/validations/gameValidationService.js'), 'validateGameInProgress').mockResolvedValue();

        jest.spyOn(discardCards, 'findOneByClause' ).mockResolvedValue(mockCard);
        jest.spyOn(discardCards, 'update' ).mockResolvedValue({ cardId: '123' });

        jest.spyOn(formatCard, 'getCardListDescription').mockResolvedValue(mockCards);

        jest.spyOn(playCard, 'getCardTopCurrentData').mockResolvedValue(mockNextStep);
        jest.spyOn(formatCard, 'getCardDescription').mockResolvedValue(mockTop);
        jest.spyOn(playCard, 'updatePlayCard').mockResolvedValue({ cardId: '123' });
        
        const result = await playCard.playCardPlayer(mockGameId, mockPlayer, 'green 2', mockUser);
        expect(result).toEqual({ nextStep: mockNextStep, playerCurrent: mockPlayerCurrent });
    });
});

describe('getCardPlayCurrent', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('should return the player card if it exists in their deck', async () => {
        const mockCardPlayed = { value: '5', color: 'Red' };
        const mockUserId = '1';
        const mockGameId = 'game1';
        const mockDiscardCards = [{ value: '5', color: 'Red' }];

        jest.spyOn(discardCards, 'findAllByClause').mockResolvedValue(mockDiscardCards);

        const result = await playCard.getCardPlayCurrent(mockCardPlayed, mockUserId, mockGameId);
        expect(result).toEqual(mockDiscardCards[0]);
    });

    it('should throw an error if the player does not have the card', async () => {
        const mockCardPlayed = { value: '5', color: 'Red' };
        const mockUserId = '1';
        const mockGameId = 'game1';
        const mockDiscardCards = [];

        jest.spyOn(discardCards, 'findAllByClause').mockResolvedValue(mockDiscardCards);

        await expect(playCard.getCardPlayCurrent(mockCardPlayed, mockUserId, mockGameId))
            .rejects.toThrow(ValidationError);
    });
});

describe('drawnCard', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('should return win message if a winner is detected', async () => {
        const mockUser = { id: '1' };
        const mockPlayer = 'player1';
        const mockGameId = 'game1';
        const mockWin = { message: 'Player1 wins!', scoresArray: [100] };

        jest.spyOn(playCard, 'beforePlayCard').mockResolvedValue(mockWin);
        const result = await playCard.drawnCard(mockGameId, mockPlayer, mockUser);
        expect(result).toEqual({ cardDrawn: mockWin.message, playerCurrent: mockWin.scoresArray });
    });

    it('should draw a card if no winner is detected', async () => {
        const mockUser = { id: '1', username: 'player 1' };
        const mockPlayer = 'player 1';
        const mockGameId = 'game1';
        const mockUnusedCards = [{ id: '101', value: '5', color: 'Red' }];
        const mockPlayerCurrent = 'Next player';
        const mockCardDrawn = { id: '101', value: '5', color: 'Red' };

        jest.spyOn(playCard, 'beforePlayCard').mockResolvedValue(false);
        jest.spyOn(playCard, 'verifyAvailabilityCard').mockResolvedValue(false);

        jest.spyOn(require('../../../utils/userPlayersCards.js'), 'getCardsDeckUnused').mockResolvedValue(mockUnusedCards);

        
        jest.spyOn(playCard, 'nextPlaterTurn').mockResolvedValue(mockPlayerCurrent);
        jest.spyOn(playCard, 'drawnUnused').mockResolvedValue(mockCardDrawn);

        const result = await playCard.drawnCard(mockGameId, mockPlayer, mockUser);
        expect(result).toEqual({ cardDrawn: mockCardDrawn, playerCurrent: mockPlayerCurrent });
    });

    it('should throw an error if the player must use a card from their hand', async () => {
        const mockUser = { id: '1' };
        const mockPlayer = 'player1';
        const mockGameId = 'game1';

        jest.spyOn(playCard, 'beforePlayCard').mockResolvedValue(false);
        jest.spyOn(playCard, 'verifyAvailabilityCard').mockResolvedValue(true);

        await expect(playCard.drawnCard(mockGameId, mockPlayer, mockUser))
            .rejects.toThrow(ValidationError);
    });
});