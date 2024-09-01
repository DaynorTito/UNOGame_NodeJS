import { HistoryRepository } from '../../repositories/HistoryRepository.js';
import { mockDeep, mockReset } from 'jest-mock-extended';

describe('HistoryRepository', () => {
    let repository;
    let mockHistoryModel;

    beforeEach(() => {
        mockHistoryModel = mockDeep();
        repository = new HistoryRepository({ historyModel: mockHistoryModel });
    });

    afterEach(() => {
        mockReset(mockHistoryModel);
    });

    test('should create a history', async () => {
        const history = { id: 1, description: 'History 1' };
        mockHistoryModel.create.mockResolvedValue(history);

        const result = await repository.create(history);

        expect(mockHistoryModel.create).toHaveBeenCalledWith(history);
        expect(result).toBe(history);
    });

    test('should find a history by id', async () => {
        const history = { id: 1, description: 'History 1' };
        mockHistoryModel.findByPk.mockResolvedValue(history);

        const result = await repository.findById(1);

        expect(mockHistoryModel.findByPk).toHaveBeenCalledWith(1);
        expect(result).toBe(history);
    });

    test('should find all histories by clause', async () => {
        const histories = [{ id: 1, description: 'History 1' }];
        const whereClause = { description: 'History 1' };
        mockHistoryModel.findAll.mockResolvedValue(histories);

        const result = await repository.findAllByClause(whereClause);

        expect(mockHistoryModel.findAll).toHaveBeenCalledWith({ where: whereClause });
        expect(result).toBe(histories);
    });

    test('should find all histories', async () => {
        const histories = [{ id: 1, description: 'History 1' }, { id: 2, description: 'History 2' }];
        mockHistoryModel.findAll.mockResolvedValue(histories);

        const result = await repository.findAll();

        expect(mockHistoryModel.findAll).toHaveBeenCalled();
        expect(result).toBe(histories);
    });

    test('should update a history', async () => {
        const history = { id: 1, description: 'History 1', update: jest.fn() };
        const updatedHistory = { id: 1, description: 'Updated History 1' };

        mockHistoryModel.findByPk.mockResolvedValue(history);
        history.update.mockResolvedValue(updatedHistory);

        const result = await repository.update(1, { description: 'Updated History 1' });

        expect(mockHistoryModel.findByPk).toHaveBeenCalledWith(1);
        expect(history.update).toHaveBeenCalledWith({ description: 'Updated History 1' });
    });

    test('should delete a history', async () => {
        const history = { id: 1, description: 'History 1', destroy: jest.fn() };

        mockHistoryModel.findByPk.mockResolvedValue(history);
        history.destroy.mockResolvedValue(true);

        const result = await repository.delete(1);

        expect(mockHistoryModel.findByPk).toHaveBeenCalledWith(1);
        expect(history.destroy).toHaveBeenCalled();
        expect(result).toBe(true);
    });

    test('should find one history by clause', async () => {
        const history = { id: 1, description: 'History 1' };
        const whereClause = { description: 'History 1' };
        mockHistoryModel.findOne.mockResolvedValue(history);

        const result = await repository.findOneByClause(whereClause);

        expect(mockHistoryModel.findOne).toHaveBeenCalledWith({ where: whereClause });
        expect(result).toBe(history);
    });
});
