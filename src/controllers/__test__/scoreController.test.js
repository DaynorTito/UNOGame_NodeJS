import {
    createScore,
    getScores,
    getScoreById,
    updateScore,
    deleteScore
} from '../scoreController.js';

import {
    createScoreService,
    getScoresService,
    getScoreByIdService,
    updateScoreService,
    deleteScoreService
} from '../../services/scoreService.js';

jest.mock('../../services/scoreService.js');

let mockRequest;
let mockResponse;
let mockNext;

beforeEach(() => {
    mockRequest = {
        body: {},
        params: {}
    };
    mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        send: jest.fn()
    };
    mockNext = jest.fn();
});

test('createScore should create a score and return 201 status', async () => {
    const mockScore = { id: 1, value: 100 };
    mockRequest.body = { value: 100 };
    createScoreService.mockResolvedValue(mockScore);

    await createScore(mockRequest, mockResponse, mockNext);

    expect(createScoreService).toHaveBeenCalledWith(mockRequest.body);
    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith(mockScore);
});

test('getScores should return all scores and 200 status', async () => {
    const mockScores = [{ id: 1, value: 100 }, { id: 2, value: 200 }];
    getScoresService.mockResolvedValue(mockScores);

    await getScores(mockRequest, mockResponse, mockNext);

    expect(getScoresService).toHaveBeenCalled();
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(mockScores);
});

test('getScoreById should return a score and 200 status when found', async () => {
    const mockScore = { id: 1, value: 100 };
    mockRequest.params = { id: '1' };
    getScoreByIdService.mockResolvedValue(mockScore);

    await getScoreById(mockRequest, mockResponse, mockNext);

    expect(getScoreByIdService).toHaveBeenCalledWith('1');
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(mockScore);
});

test('getScoreById should return 404 when score not found', async () => {
    mockRequest.params = { id: '999' };
    getScoreByIdService.mockResolvedValue(null);

    await getScoreById(mockRequest, mockResponse, mockNext);

    expect(getScoreByIdService).toHaveBeenCalledWith('999');
    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Score not found' });
});

test('updateScore should update a score and return 200 status', async () => {
    const mockUpdatedScore = { id: 1, value: 150 };
    mockRequest.params = { id: '1' };
    mockRequest.body = { value: 150 };
    updateScoreService.mockResolvedValue(mockUpdatedScore);

    await updateScore(mockRequest, mockResponse, mockNext);

    expect(updateScoreService).toHaveBeenCalledWith('1', mockRequest.body);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(mockUpdatedScore);
});

test('deleteScore should delete a score and return 204 status', async () => {
    mockRequest.params = { id: '1' };
    deleteScoreService.mockResolvedValue();

    await deleteScore(mockRequest, mockResponse, mockNext);

    expect(deleteScoreService).toHaveBeenCalledWith('1');
    expect(mockResponse.status).toHaveBeenCalledWith(204);
    expect(mockResponse.send).toHaveBeenCalled();
});

test('should handle errors and return 500 status', async () => {
    const errorMessage = 'Test error';
    createScoreService.mockRejectedValue(new Error(errorMessage));

    await createScore(mockRequest, mockResponse, mockNext);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: errorMessage });
});
