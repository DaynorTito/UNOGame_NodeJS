import {
    getUserPlayers,
    getUserPlayerById,
    registerUserPlayer,
    deleteUserPlayer,
    updateUserPlayer,
    getBasicDetails
} from '../userPlayerController.js';

import {
    registerUserPlayerService,
    deleteUserPlayerService,
    getUserPlayerByIdService,
    getUserPlayersService,
    updateUserPlayerService
} from '../../services/userPlayerService.js';

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

test('registerUserPlayer should register a user and return 200 status', async () => {
    mockRequest.body = { username: 'testuser', email: 'test@example.com' };
    registerUserPlayerService.mockResolvedValue({});

    await registerUserPlayer(mockRequest, mockResponse, mockNext);

    expect(registerUserPlayerService).toHaveBeenCalledWith(mockRequest.body);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({message: "User registered successfully"});
});

test('getUserPlayers should return all users and 200 status', async () => {
    const mockUsers = [{ id: 1, username: 'user1' }, { id: 2, username: 'user2' }];
    getUserPlayersService.mockResolvedValue(mockUsers);

    await getUserPlayers(mockRequest, mockResponse, mockNext);

    expect(getUserPlayersService).toHaveBeenCalled();
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(mockUsers);
});

test('getUserPlayerById should return a user and 200 status when found', async () => {
    const mockUser = { id: 1, username: 'user1' };
    mockRequest.params = { id: '1' };
    getUserPlayerByIdService.mockResolvedValue(mockUser);

    await getUserPlayerById(mockRequest, mockResponse, mockNext);

    expect(getUserPlayerByIdService).toHaveBeenCalledWith('1');
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(mockUser);
});

test('getUserPlayerById should return 404 when user not found', async () => {
    mockRequest.params = { id: '999' };
    getUserPlayerByIdService.mockResolvedValue(null);

    await getUserPlayerById(mockRequest, mockResponse, mockNext);

    expect(getUserPlayerByIdService).toHaveBeenCalledWith('999');
    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'UserPlayer not found' });
});

test('updateUserPlayer should update a user and return 200 status', async () => {
    const mockUpdatedUser = { id: 1, username: 'updateduser' };
    mockRequest.params = { id: '1' };
    mockRequest.body = { username: 'updateduser' };
    updateUserPlayerService.mockResolvedValue(mockUpdatedUser);

    await updateUserPlayer(mockRequest, mockResponse, mockNext);

    expect(updateUserPlayerService).toHaveBeenCalledWith('1', mockRequest.body);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(mockUpdatedUser);
});

test('deleteUserPlayer should delete a user and return 204 status', async () => {
    mockRequest.params = { id: '1' };
    deleteUserPlayerService.mockResolvedValue();

    await deleteUserPlayer(mockRequest, mockResponse, mockNext);

    expect(deleteUserPlayerService).toHaveBeenCalledWith('1');
    expect(mockResponse.status).toHaveBeenCalledWith(204);
    expect(mockResponse.send).toHaveBeenCalled();
});

test('getBasicDetails should return user basic details and 200 status', async () => {
    const mockUser = { id: 1, username: 'user1', email: 'user1@example.com' };
    getUserPlayerByIdService.mockResolvedValue(mockUser);

    await getBasicDetails(mockRequest, mockResponse, mockNext);

    expect(getUserPlayerByIdService).toHaveBeenCalledWith(1);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({username: 'user1', email: 'user1@example.com'});
});

test('should handle errors and return 500 status', async () => {
    const errorMessage = 'Test error';
    registerUserPlayerService.mockRejectedValue(new Error(errorMessage));

    await registerUserPlayer(mockRequest, mockResponse, mockNext);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: errorMessage });
});
