import jwt from 'jsonwebtoken';
import { getUserPlayerByname } from '../userPlayerService.js';
import { login, validateToken, logout } from '../authService.js';

jest.mock('jsonwebtoken');
jest.mock('../userPlayerService.js');

beforeEach(() => {
  jest.clearAllMocks();
  process.env.SECRET = 'test-secret';
});

test('login should return a token for valid credentials', async () => {
  const mockUser = { id: 1, username: 'testuser', email: 'test@example.com',
    comparePassword: jest.fn().mockResolvedValue(true),
  };
  getUserPlayerByname.mockResolvedValue(mockUser);
  jwt.sign.mockReturnValue('mock-token');

  const result = await login('testuser', 'password');
  expect(getUserPlayerByname).toHaveBeenCalledWith('testuser');
  expect(mockUser.comparePassword).toHaveBeenCalledWith('password');
  expect(jwt.sign).toHaveBeenCalledWith(
    { id: 1, username: 'testuser', email: 'test@example.com' },
    'test-secret'
  );
  expect(result).toBe('mock-token');
});

test('login should throw an error for invalid username', async () => {
  getUserPlayerByname.mockResolvedValue(null);
  await expect(login('invaliduser', 'password')).rejects.toThrow('Inavid credentials');
});

test('login should throw an error for invalid password', async () => {
  const mockUser = {
    comparePassword: jest.fn().mockResolvedValue(false),
  };
  getUserPlayerByname.mockResolvedValue(mockUser);
  await expect(login('testuser', 'wrongpassword')).rejects.toThrow('Inavid password');
});

test('logout should return success message for valid token', () => {
  jwt.verify.mockReturnValue(true);

  const result = logout('valid-token');

  expect(jwt.verify).toHaveBeenCalledWith('valid-token', 'test-secret');
  expect(result).toEqual({ message: 'User logged out successfully' });
});

test('logout should return invalid message for invalid token', () => {
  jwt.verify.mockReturnValue(false);
  const result = logout('invalid-token');

  expect(jwt.verify).toHaveBeenCalledWith('invalid-token', 'test-secret');
  expect(result).toEqual({ message: 'Invalid token' });
});

test('validateToken should return decoded token for valid bearer token', () => {
  const mockDecodedToken = { id: 1, username: 'testuser' };
  jwt.verify.mockReturnValue(mockDecodedToken);
  const result = validateToken('Bearer valid-token');
  expect(jwt.verify).toHaveBeenCalledWith('valid-token', 'test-secret');
  expect(result).toEqual(mockDecodedToken);
});


test('login should return a valid token for correct credentials', async () => {
    const mockUser = {
      id: 1,
      username: 'testuser',
      email: 'test@example.com',
      comparePassword: jest.fn().mockResolvedValue(true),
    };
    getUserPlayerByname.mockResolvedValue(mockUser);
  
    const token = await login('testuser', 'correctpassword');
  
    expect(typeof token).toBe('string');
    
    const decodedToken = jwt.verify(token, process.env.SECRET);
    expect(decodedToken).toMatchObject({
      id: mockUser.id,
      username: mockUser.username,
    });
    if (decodedToken.email) {
      expect(decodedToken.email).toBe(mockUser.email);
    }
  });

  test('login should throw an error for invalid username', async () => {
    getUserPlayerByname.mockResolvedValue(null);
  
    await expect(login('invaliduser', 'password')).rejects.toThrow('Inavid credentials');
  });
  
  test('login should throw an error for invalid password', async () => {
    const mockUser = {
      comparePassword: jest.fn().mockResolvedValue(false),
    };
    getUserPlayerByname.mockResolvedValue(mockUser);
  
    await expect(login('testuser', 'wrongpassword')).rejects.toThrow('Inavid password');
  });
  
  test('logout should return success message for valid token', async () => {
    const mockUser = {
      id: 1,
      username: 'testuser',
      email: 'test@example.com',
    };
    const token = jwt.sign(mockUser, process.env.SECRET);
  
    const result = logout(token);
  
    expect(result).toEqual({ message: 'User logged out successfully' });
  });
  
test('validateToken should return decoded token for valid bearer token', () => {
    const mockUser = {
      id: 1,
      username: 'testuser',
    };
    const token = jwt.sign(mockUser, process.env.SECRET);
  
    const result = validateToken(`Bearer ${token}`);
  
    expect(result).toMatchObject(mockUser);
    if (result.email) {
      expect(result.email).toBe(mockUser.email);
    }
});
