import axios from 'axios';

describe('API End-to-End Tests - Game Creation', () => {
  let axiosInstance;
  let accessToken;
  let createdUserId;
  const gamesToDelete = [];

  const testUser = {
    username: 'testuser123',
    email: 'testuser123@example.com',
    age: 25,
    password: 'testpassword'
  };

  const validGameData = {
    title: 'Uno Game Friendly Game',
    maxPlayers: 4,
    rules: 'You cannot pick up cards'
  };

  beforeAll(async () => {
    axiosInstance = axios.create({ baseURL: 'http://localhost:3000' });

    try {
      const userResponse = await axiosInstance.post('/api/v1/register', testUser);
      createdUserId = userResponse.data.userId;

      const loginResponse = await axiosInstance.post('/api/v1/login', {
        username: testUser.username,
        password: testUser.password
      });
      accessToken = loginResponse.data.access_token;
    } catch (error) {
      console.error('Error during user setup:', error.message);
      throw error;
    }
  });

  afterAll(async () => {
    try {
      for (const gameId of gamesToDelete) {
        await axiosInstance.delete(`/api/v1/games/${gameId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
      }

      await axiosInstance.delete(`/api/v1/users/${createdUserId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
    } catch (error) {
      console.error('Error during cleanup:', error.message);
      throw error;
    }
  });

  it('should create a game successfully with valid data', async () => {
    try {
      const response = await axiosInstance.post('/api/v1/games', validGameData, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      expect(response.status).toBe(201);
      expect(response.data).toMatchObject({
        message: 'Game created successfully',
        id: expect.any(String)
      });

      gamesToDelete.push(response.data.id);
    } catch (error) {
      console.error('Error creating game:', error.message);
      throw error;
    }
  });

  it('should fail when title is empty', async () => {
    try {
      const invalidGameData = { ...validGameData, title: '' };

      const response = await axiosInstance.post('/api/v1/games', invalidGameData, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      expect(response.status).toBe(400);
      expect(response.data).toMatchObject({
        error: expect.objectContaining({
          status: 400,
          message: expect.stringContaining('Title is required')
        })
      });
    } catch (error) {
      expect(error.response.status).toBe(400);
    }
  });

  it('should fail when maxPlayers is less than or equal to 1', async () => {
    try {
      const invalidGameData = { ...validGameData, maxPlayers: 1 };

      const response = await axiosInstance.post('/api/v1/games', invalidGameData, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      expect(response.status).toBe(400);
      expect(response.data).toMatchObject({
        error: expect.objectContaining({
          status: 400,
          message: expect.stringContaining('Max players must be greater than 1')
        })
      });
    } catch (error) {
      expect(error.response.status).toBe(400);
    }
  });
});
