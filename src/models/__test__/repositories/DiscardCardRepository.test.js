import { DiscardCardRepository } from '../../repositories/DiscardCardRepository.js';
import { mockDeep, mockReset } from 'jest-mock-extended';

describe('DiscardCardRepository', () => {
    let repository;
    let mockDiscardModel;

    beforeEach(() => {
        // Resetea el mock antes de cada test
        mockDiscardModel = mockDeep();
        repository = new DiscardCardRepository({ discardModel: mockDiscardModel });
    });

    afterEach(() => {
        // Limpia el estado de los mocks después de cada test
        mockReset(mockDiscardModel);
    });

    test('should create a discard card', async () => {
        const discard = { id: 1, name: 'Discard 1' };
        mockDiscardModel.create.mockResolvedValue(discard);

        const result = await repository.create(discard);

        expect(mockDiscardModel.create).toHaveBeenCalledWith(discard);
        expect(result).toBe(discard);
    });

    test('should find a discard card by id', async () => {
        const discard = { id: 1, name: 'Discard 1' };
        mockDiscardModel.findByPk.mockResolvedValue(discard);

        const result = await repository.findById(1);

        expect(mockDiscardModel.findByPk).toHaveBeenCalledWith(1);
        expect(result).toBe(discard);
    });

    test('should find all discard cards', async () => {
        const discards = [{ id: 1, name: 'Discard 1' }, { id: 2, name: 'Discard 2' }];
        mockDiscardModel.findAll.mockResolvedValue(discards);

        const result = await repository.findAll();

        expect(mockDiscardModel.findAll).toHaveBeenCalled();
        expect(result).toBe(discards);
    });

    test('should find all discard cards by clause', async () => {
        const discards = [{ id: 1, name: 'Discard 1' }];
        const whereClause = { name: 'Discard 1' };
        mockDiscardModel.findAll.mockResolvedValue(discards);

        const result = await repository.findAllByClause(whereClause);

        expect(mockDiscardModel.findAll).toHaveBeenCalledWith({ where: whereClause });
        expect(result).toBe(discards);
    });

    test('should update a discard card', async () => {
        const discard = { id: 1, name: 'Discard 1', update: jest.fn() };
        const updatedDiscard = { id: 1, name: 'Updated Discard 1' };

        mockDiscardModel.findByPk.mockResolvedValue(discard);
        discard.update.mockResolvedValue(updatedDiscard);

        const result = await repository.update(1, { name: 'Updated Discard 1' });

        expect(mockDiscardModel.findByPk).toHaveBeenCalledWith(1);
        expect(discard.update).toHaveBeenCalledWith({ name: 'Updated Discard 1' });
    });

    test('should delete a discard card', async () => {
        const discard = { id: 1, name: 'Discard 1', destroy: jest.fn() };

        mockDiscardModel.findByPk.mockResolvedValue(discard);
        discard.destroy.mockResolvedValue(true);

        const result = await repository.delete(1);

        expect(mockDiscardModel.findByPk).toHaveBeenCalledWith(1);
        expect(discard.destroy).toHaveBeenCalled();
        expect(result).toBe(true);
    });

    test('should bulk create discard cards', async () => {
        const discards = [{ id: 1, name: 'Discard 1' }, { id: 2, name: 'Discard 2' }];
        mockDiscardModel.bulkCreate.mockResolvedValue(discards);

        const result = await repository.bulkCreate(discards);

        expect(mockDiscardModel.bulkCreate).toHaveBeenCalledWith(discards);
        expect(result).toBe(discards);
    });

    test('should find one discard card by clause', async () => {
        const discard = { id: 1, name: 'Discard 1' };
        const whereClause = { name: 'Discard 1' };
        mockDiscardModel.findOne.mockResolvedValue(discard);

        const result = await repository.findOneByClause(whereClause);

        expect(mockDiscardModel.findOne).toHaveBeenCalledWith({ where: whereClause });
        expect(result).toBe(discard);
    });
});
