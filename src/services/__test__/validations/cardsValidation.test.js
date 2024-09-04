import { ValidationError } from "../../../errors/customError.js";
import container from "../../../config/container.js";
import { VarifyTopCard } from "../../validations/cardsValidation.js";

const discardCardRepository = container.resolve('discardCardRepository');

describe('VarifyTopCard', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should throw ValidationError if there is no top card for the given game', async () => {
        const mockGameId = 'game1';

        jest.spyOn(discardCardRepository, 'findOneByClause').mockResolvedValue(null);

        await expect(VarifyTopCard(mockGameId)).rejects.toThrow(ValidationError);
        await expect(VarifyTopCard(mockGameId)).rejects.toThrow('Must deal the cards first');
    });

    it('should not throw any error if a top card exists for the given game', async () => {
        const mockGameId = 'game2';
        const mockTopCard = { id: 'card1', top: true, gameId: mockGameId };

        jest.spyOn(discardCardRepository, 'findOneByClause').mockResolvedValue(mockTopCard);

        await expect(VarifyTopCard(mockGameId)).resolves.not.toThrow();
    });
});
