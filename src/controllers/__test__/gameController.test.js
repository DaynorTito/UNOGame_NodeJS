import {
    createGame,
    getGames,
    getGameById,
    updateGame,
    deleteGame,
    startGame,
    finishGame,
    getStatusGame,
    getPlayersGame,
    getNextPlayer
} from '../gameController.js';

import {
    createGameService,
    getGamesService,
    getGameByIdService,
    updateGameService,
    deleteGameService,
    startGameService,
    endGameService,
    getPlayersService,
    getNextTurnService
} from '../../services/gameService.js';

import { getUserPlayerByIdService } from '../../services/userPlayerService.js';

jest.mock('../../services/gameService.js');
jest.mock('../../services/userPlayerService.js');

let mockRequest;
let mockResponse;
let mockNext;

beforeEach(() => {
    mockRequest = {
    body: {},
    params: {},
    user: { id: 1 }
    };
    mockResponse = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
    send: jest.fn()
    };
    mockNext = jest.fn();
});

test('createGame should create a game and return 201 status', async () => {
    const mockGame = { id: 1 };
    mockRequest.body = { name: 'New Game' };
    createGameService.mockResolvedValue(mockGame);

    await createGame(mockRequest, mockResponse, mockNext);

    expect(createGameService).toHaveBeenCalledWith(mockRequest.body, mockRequest.user);
    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith({message: 'Game created successfully', id: mockGame.id});
});

test('getGames should return all games and 200 status', async () => {
    const mockGames = [{ id: 1 }, { id: 2 }];
    getGamesService.mockResolvedValue(mockGames);

    await getGames(mockRequest, mockResponse, mockNext);

    expect(getGamesService).toHaveBeenCalled();
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(mockGames);
});

test('getGameById should return a game and 200 status when found', async () => {
    const mockGame = { id: 1, name: 'Test Game' };
    mockRequest.params = { id: '1' };
    getGameByIdService.mockResolvedValue(mockGame);

    await getGameById(mockRequest, mockResponse, mockNext);

    expect(getGameByIdService).toHaveBeenCalledWith('1');
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(mockGame);
});

test('getGameById should return 404 when game not found', async () => {
    mockRequest.params = { id: '999' };
    getGameByIdService.mockResolvedValue(null);

    await getGameById(mockRequest, mockResponse, mockNext);

    expect(getGameByIdService).toHaveBeenCalledWith('999');
    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Game not found' });
});

test('updateGame should update a game and return 200 status', async () => {
    const mockUpdatedGame = { id: 1, name: 'Updated Game' };
    mockRequest.params = { id: '1' };
    mockRequest.body = { name: 'Updated Game' };
    updateGameService.mockResolvedValue(mockUpdatedGame);

    await updateGame(mockRequest, mockResponse, mockNext);

    expect(updateGameService).toHaveBeenCalledWith('1', mockRequest.body);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(mockUpdatedGame);
});

test('deleteGame should delete a game and return 204 status', async () => {
    mockRequest.params = { id: '1' };
    deleteGameService.mockResolvedValue();

    await deleteGame(mockRequest, mockResponse, mockNext);

    expect(deleteGameService).toHaveBeenCalledWith('1');
    expect(mockResponse.status).toHaveBeenCalledWith(204);
    expect(mockResponse.send).toHaveBeenCalled();
});

test('startGame should start a game and return 200 status', async () => {
    mockRequest.body = { gameId: '1' };
    startGameService.mockResolvedValue({});

    await startGame(mockRequest, mockResponse, mockNext);

    expect(startGameService).toHaveBeenCalledWith('1', mockRequest.body, mockRequest.user.id);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({message: 'Game started successfully'});
});

test('finishGame should end a game and return 200 status', async () => {
    mockRequest.body = { gameId: '1' };
    endGameService.mockResolvedValue({});

    await finishGame(mockRequest, mockResponse, mockNext);

    expect(endGameService).toHaveBeenCalledWith('1', mockRequest.body, mockRequest.user.id);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({message: 'Game ended successfully'});
});

test('getStatusGame should return game status and 200 status', async () => {
    mockRequest.body = { gameId: '1' };
    const mockGame = { id: 1, status: 'active' };
    getGameByIdService.mockResolvedValue(mockGame);

    await getStatusGame(mockRequest, mockResponse, mockNext);

    expect(getGameByIdService).toHaveBeenCalledWith('1');
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({gameId: '1', state: 'active'});
});

test('getPlayersGame should return players and 200 status', async () => {
    mockRequest.body = { gameId: '1' };
    const mockPlayers = [{ id: 1 }, { id: 2 }];
    getPlayersService.mockResolvedValue(mockPlayers);

    await getPlayersGame(mockRequest, mockResponse, mockNext);

    expect(getPlayersService).toHaveBeenCalledWith('1');
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({gameId: '1', players: mockPlayers});
});

test('getNextPlayer should return next player and 200 status', async () => {
    mockRequest.body = { gameId: '1' };
    getNextTurnService.mockResolvedValue(2);
    getUserPlayerByIdService.mockResolvedValue({ id: 2, username: 'player2' });

    await getNextPlayer(mockRequest, mockResponse, mockNext);

    expect(getNextTurnService).toHaveBeenCalledWith('1');
    expect(getUserPlayerByIdService).toHaveBeenCalledWith(2);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({gameId: '1', username: 'player2'});
});
