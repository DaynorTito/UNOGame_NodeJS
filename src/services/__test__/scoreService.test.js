import { createScoreService, 
    getScoresService, 
    getScoreByIdService, 
    updateScoreService, 
    deleteScoreService 
} from "../scoreService.js";

import Score from '../../models/score.js';

jest.mock("../../models/score.js");

afterEach(() => {
    jest.clearAllMocks();
});

test('should create a new score', async () => {
    const scoreData = { value: 100, userId: 1 };
    const mockScore = { id: 1, ...scoreData };
    Score.create.mockResolvedValue(mockScore);

    const result = await createScoreService(scoreData);

    expect(Score.create).toHaveBeenCalledWith(scoreData);
    expect(result).toEqual(mockScore);
});

test('should return all scores', async () => {
    const mockScores = [
    { id: 1, value: 100, userId: 1 },
    { id: 2, value: 200, userId: 2 }
    ];
    Score.findAll.mockResolvedValue(mockScores);

    const result = await getScoresService();

    expect(Score.findAll).toHaveBeenCalled();
    expect(result).toEqual(mockScores);
});

test('should return a score by id', async () => {
    const mockScore = { id: 1, value: 100, userId: 1 };
    Score.findByPk.mockResolvedValue(mockScore);

    const result = await getScoreByIdService(1);

    expect(Score.findByPk).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockScore);
});

test('should update a score', async () => {
    const mockScore = { id: 1, value: 100, userId: 1,
        update: jest.fn().mockImplementation(function(data) {
            Object.assign(this, data);
            return this;
        })
    };
    Score.findByPk.mockResolvedValue(mockScore);
    const updateData = { value: 150 };
    const result = await updateScoreService(1, updateData);
    expect(Score.findByPk).toHaveBeenCalledWith(1);
    expect(mockScore.update).toHaveBeenCalledWith(updateData);
    expect({ id: result.id, value: result.value, userId: result.userId})
    .toEqual({ id: 1, value: 150, userId: 1 });
});

test('should throw error if score not found during update', async () => {
    Score.findByPk.mockResolvedValue(null);

    await expect(updateScoreService(999, { value: 150 }))
    .rejects.toThrow('Score not found');
});

test('should delete a score', async () => {
    const mockScore = { 
    id: 1,
    destroy: jest.fn().mockResolvedValue(true)
    };
    Score.findByPk.mockResolvedValue(mockScore);

    const result = await deleteScoreService(1);

    expect(Score.findByPk).toHaveBeenCalledWith(1);
    expect(mockScore.destroy).toHaveBeenCalled();
    expect(result).toBe(true);
});

test('should throw error if score not found during delete', async () => {
    Score.findByPk.mockResolvedValue(null);

    await expect(deleteScoreService(999))
    .rejects.toThrow('Score not found');
});