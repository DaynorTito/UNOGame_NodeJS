import { CardRepository } from '../../repositories/CardRepository.js';
import { mockDeep, mockReset } from 'jest-mock-extended';

describe('CardRepository', () => {
    let repository;
    let mockCardModel;

    beforeEach(() => {
        // Resetea el mock antes de cada test
        mockCardModel = mockDeep();
        repository = new CardRepository({ cardModel: mockCardModel });
    });

    afterEach(() => {
        // Limpia el estado de los mocks después de cada test
        mockReset(mockCardModel);
    });

    test('should create a card', async () => {
        const card = { id: 1, name: 'Card 1' };
        mockCardModel.create.mockResolvedValue(card);

        const result = await repository.create(card);

        expect(mockCardModel.create).toHaveBeenCalledWith(card);
        expect(result).toBe(card);
    });

    test('should find a card by id', async () => {
        const card = { id: 1, name: 'Card 1' };
        mockCardModel.findByPk.mockResolvedValue(card);

        const result = await repository.findById(1);

        expect(mockCardModel.findByPk).toHaveBeenCalledWith(1);
        expect(result).toBe(card);
    });

    test('should find all cards', async () => {
        const cards = [{ id: 1, name: 'Card 1' }, { id: 2, name: 'Card 2' }];
        mockCardModel.findAll.mockResolvedValue(cards);

        const result = await repository.findAll();

        expect(mockCardModel.findAll).toHaveBeenCalled();
        expect(result).toBe(cards);
    });

    test('should find all cards by clause', async () => {
        const cards = [{ id: 1, name: 'Card 1' }];
        const whereClause = { name: 'Card 1' };
        mockCardModel.findAll.mockResolvedValue(cards);

        const result = await repository.findAllByClause(whereClause);

        expect(mockCardModel.findAll).toHaveBeenCalledWith({ where: whereClause });
        expect(result).toBe(cards);
    });

    test('should update a card', async () => {
        const card = { id: 1, name: 'Card 1', update: jest.fn() };
        const updatedCard = { id: 1, name: 'Updated Card 1' };

        mockCardModel.findByPk.mockResolvedValue(card);
        card.update.mockResolvedValue(updatedCard);

        const result = await repository.update(1, { name: 'Updated Card 1' });

        expect(mockCardModel.findByPk).toHaveBeenCalledWith(1);
        expect(card.update).toHaveBeenCalledWith({ name: 'Updated Card 1' });
    });

    test('should delete a card', async () => {
        const card = { id: 1, name: 'Card 1', destroy: jest.fn() };

        mockCardModel.findByPk.mockResolvedValue(card);
        card.destroy.mockResolvedValue(true);

        const result = await repository.delete(1);

        expect(mockCardModel.findByPk).toHaveBeenCalledWith(1);
        expect(card.destroy).toHaveBeenCalled();
        expect(result).toBe(true);
    });
});
