import { loginUser, logoutUser } from '../authController.js';
import { login, logout } from '../../services/authService.js';

jest.mock('../../services/authService.js');

let mockRequest;
let mockResponse;
let mockNext;

beforeEach(() => {
    mockRequest = {
        body: {}
    };
    mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
    };
    mockNext = jest.fn();
});

test('should login user and return access token with 200 status', async () => {
    const mockToken = 'mock_access_token';
    mockRequest.body = { username: 'testuser', password: 'testpassword' };
    login.mockResolvedValue(mockToken);

    await loginUser(mockRequest, mockResponse, mockNext);

    expect(login).toHaveBeenCalledWith('testuser', 'testpassword');
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({ access_token: mockToken });
});

test('should return 400 status when login fails', async () => {
    const errorMessage = 'Invalid credentials';
    mockRequest.body = { username: 'testuser', password: 'wrongpassword' };
    login.mockRejectedValue(new Error(errorMessage));

    await loginUser(mockRequest, mockResponse, mockNext);

    expect(login).toHaveBeenCalledWith('testuser', 'wrongpassword');
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: errorMessage });
});



test('should return 400 status when access token is missing', async () => {
    mockRequest.body = {};

    await logoutUser(mockRequest, mockResponse, mockNext);

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Access token is required' });
});

test('should return 400 status when logout fails', async () => {
    const errorMessage = 'Invalid token';
    mockRequest.body = { access_token: 'invalid_token' };
    logout.mockRejectedValue(new Error(errorMessage));

    await logoutUser(mockRequest, mockResponse, mockNext);

    expect(logout).toHaveBeenCalledWith('invalid_token');
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: errorMessage });
});
