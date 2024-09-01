import { ScoreRepository } from '../../repositories/ScoreRepository.js';
import { mockDeep, mockReset } from 'jest-mock-extended';

describe('ScoreRepository', () => {
    let repository;
    let mockScoreModel;

    beforeEach(() => {
        mockScoreModel = mockDeep();
        repository = new ScoreRepository({ scoreModel: mockScoreModel });
    });

    afterEach(() => {
        mockReset(mockScoreModel);
    });

    test('should create a score', async () => {
        const score = { id: 1, value: 100 };
        mockScoreModel.create.mockResolvedValue(score);

        const result = await repository.create(score);

        expect(mockScoreModel.create).toHaveBeenCalledWith(score);
        expect(result).toBe(score);
    });

    test('should find a score by id', async () => {
        const score = { id: 1, value: 100 };
        mockScoreModel.findByPk.mockResolvedValue(score);

        const result = await repository.findById(1);

        expect(mockScoreModel.findByPk).toHaveBeenCalledWith(1);
        expect(result).toBe(score);
    });

    test('should find all scores', async () => {
        const scores = [{ id: 1, value: 100 }, { id: 2, value: 200 }];
        mockScoreModel.findAll.mockResolvedValue(scores);

        const result = await repository.findAll();

        expect(mockScoreModel.findAll).toHaveBeenCalled();
        expect(result).toBe(scores);
    });

    test('should update a score', async () => {
        const score = { id: 1, value: 100, update: jest.fn() };
        const updatedScore = { id: 1, value: 150 };

        mockScoreModel.findByPk.mockResolvedValue(score);
        score.update.mockResolvedValue(updatedScore);

        const result = await repository.update(1, { value: 150 });

        expect(mockScoreModel.findByPk).toHaveBeenCalledWith(1);
        expect(score.update).toHaveBeenCalledWith({ value: 150 });
    });

    test('should delete a score', async () => {
        const score = { id: 1, value: 100, destroy: jest.fn() };

        mockScoreModel.findByPk.mockResolvedValue(score);
        score.destroy.mockResolvedValue(true);

        const result = await repository.delete(1);

        expect(mockScoreModel.findByPk).toHaveBeenCalledWith(1);
        expect(score.destroy).toHaveBeenCalled();
        expect(result).toBe(true);
    });
});
