import {
    createCard,
    getCards,
    getCardById,
    updateCard,
    deleteCard
} from '../cardController.js';

import {
    createCardService,
    getCardsService,
    getCardByIdService,
    updateCardService,
    deleteCardService
} from '../../services/cardService.js';

jest.mock('../../services/cardService.js');

let mockRequest;
let mockResponse;
let mockNext;

beforeEach(() => {
    mockRequest = {};
    mockResponse = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
    send: jest.fn()
    };
    mockNext = jest.fn();
});

test('createCard should create a card and return 201 status', async () => {
    const mockCard = { id: 1, name: 'New Card' };
    mockRequest.body = { name: 'New Card' };
    createCardService.mockResolvedValue(mockCard);

    await createCard(mockRequest, mockResponse, mockNext);

    expect(createCardService).toHaveBeenCalledWith(mockRequest.body);
    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith(mockCard);
});

test('getCards should return all cards and 200 status', async () => {
    const mockCards = [{ id: 1 }, { id: 2 }];
    getCardsService.mockResolvedValue(mockCards);

    await getCards(mockRequest, mockResponse, mockNext);

    expect(getCardsService).toHaveBeenCalled();
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(mockCards);
});

test('getCardById should return a card and 200 status when found', async () => {
    const mockCard = { id: 1, name: 'Test Card' };
    mockRequest.params = { id: '1' };
    getCardByIdService.mockResolvedValue(mockCard);

    await getCardById(mockRequest, mockResponse, mockNext);

    expect(getCardByIdService).toHaveBeenCalledWith('1');
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(mockCard);
});

test('getCardById should return 404 when card not found', async () => {
    mockRequest.params = { id: '999' };
    getCardByIdService.mockResolvedValue(null);

    await getCardById(mockRequest, mockResponse, mockNext);

    expect(getCardByIdService).toHaveBeenCalledWith('999');
    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Card not found' });
});

test('updateCard should update a card and return 200 status', async () => {
    const mockUpdatedCard = { id: 1, name: 'Updated Card' };
    mockRequest.params = { id: '1' };
    mockRequest.body = { name: 'Updated Card' };
    updateCardService.mockResolvedValue(mockUpdatedCard);

    await updateCard(mockRequest, mockResponse, mockNext);

    expect(updateCardService).toHaveBeenCalledWith('1', mockRequest.body);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(mockUpdatedCard);
});

test('deleteCard should delete a card and return 204 status', async () => {
    mockRequest.params = { id: '1' };
    deleteCardService.mockResolvedValue();

    await deleteCard(mockRequest, mockResponse, mockNext);

    expect(deleteCardService).toHaveBeenCalledWith('1');
    expect(mockResponse.status).toHaveBeenCalledWith(204);
    expect(mockResponse.send).toHaveBeenCalled();
});
