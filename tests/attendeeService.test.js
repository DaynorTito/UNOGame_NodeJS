import axios from 'axios';

describe('API End-to-End Tests - Attendee Joining a Game', () => {
  let axiosInstance;
  let accessToken;
  let createdUserId;
  let createdGameId;
  const attendeesToDelete = [];

  const testUser = {
    username: 'testuser456',
    email: 'testuser456@example.com',
    age: 30,
    password: 'testpassword'
  };

  const gameData = {
    title: 'Test Game',
    maxPlayers: 4,
    rules: 'Standard rules'
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

      const gameResponse = await axiosInstance.post('/api/v1/games', gameData, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      createdGameId = gameResponse.data.id;
    } catch (error) {
      console.error('Error during setup:', error.message);
      throw error;
    }
  });

  afterAll(async () => {
    try {
      for (const attendeeId of attendeesToDelete) {
        await axiosInstance.delete(`/api/v1/attendees/${attendeeId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
      }
  
      await axiosInstance.delete(`/api/v1/games/${createdGameId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
  
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

  it('should join a game successfully with valid data', async () => {
    try {
      const response = await axiosInstance.post('/api/v1/attendees', { gameId: createdGameId }, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      expect(response.status).toBe(201);
      expect(response.data).toMatchObject({
        message: 'User joined the game successfully',
        userId: expect.any(String)
      });

      attendeesToDelete.push(response.data.attendeeId);
    } catch (error) {
      console.error('Error joining game:', error.message);
      throw error;
    }
  });

  it('should fail when gameId is empty', async () => {
    try {
      const response = await axiosInstance.post('/api/v1/attendees', { gameId: '' }, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      expect(response.status).toBe(400);
      expect(response.data).toMatchObject({
        error: expect.objectContaining({
          status: 400,
          message: 'Game does not exist'
        })
      });
    } catch (error) {
      expect(error.response.status).toBe(400);
    }
  });

  it('should fail when user tries to join the same game again', async () => {
    try {
      await axiosInstance.post('/api/v1/attendees', { gameId: createdGameId }, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      const response = await axiosInstance.post('/api/v1/attendees', { gameId: createdGameId }, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      expect(response.status).toBe(409);
      expect(response.data).toMatchObject({
        error: expect.objectContaining({
          status: 409,
          message: 'Already exists',
          path: '/api/v1/attendees',
          method: 'POST'
        })
      });
    } catch (error) {
      expect(error.response.status).toBe(409);
    }
  });

  it('should fail when request is made without an authorization token', async () => {
    try {
      const response = await axiosInstance.post('/api/v1/attendees', { gameId: createdGameId });

      expect(response.status).toBe(401);
      expect(response.data).toMatchObject({
        error: 'No token provided'
      });
    } catch (error) {
      expect(error.response.status).toBe(401);
    }
  });
});
