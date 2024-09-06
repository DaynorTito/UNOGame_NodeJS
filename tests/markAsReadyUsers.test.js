import axios from 'axios';

describe('POST /api/v1/attendeeReady Tests', () => {
  let axiosInstance;
  let accessToken;
  let createdUserId;
  let createdGameId;
  let idAttendee;

  beforeAll(async () => {
    axiosInstance = axios.create({ baseURL: 'http://localhost:3000' });

    const userResponse = await axiosInstance.post('/api/v1/register', {
      username: 'userReadyTest',
      email: 'userReadyTest@example.com',
      age: 25,
      password: 'securePassword123'
    });
    createdUserId = userResponse.data.userId;

    const loginResponse = await axiosInstance.post('/api/v1/login', {
      username: 'userReadyTest',
      password: 'securePassword123'
    });
    accessToken = loginResponse.data.access_token;

    const gameResponse = await axiosInstance.post('/api/v1/games', {
      title: 'Ready Game Test',
      maxPlayers: 4,
      rules: 'Standard Rules'
    }, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    createdGameId = gameResponse.data.id;

    const attendeeResponse = await axiosInstance.post('/api/v1/attendees', {
      gameId: createdGameId
    }, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    idAttendee = attendeeResponse.data.attendeeId;
  });

  afterAll(async () => {
    try {
      await axiosInstance.delete(`/api/v1/attendees/${idAttendee}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

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

  it('should mark user as ready successfully', async () => {
    const response = await axiosInstance.post('/api/v1/attendeeReady', {
      gameId: createdGameId
    }, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    expect(response.status).toBe(200);
    expect(response.data).toMatchObject({
      message: 'User mark as ready successfully',
      idUser: createdUserId
    });
  });

  it('should return error when user tries to mark ready again', async () => {
    const response = await axiosInstance.post('/api/v1/attendeeReady', {
      gameId: createdGameId
    }, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).catch(error => error.response);

    expect(response.status).toBe(400);
    expect(response.data).toMatchObject({
      error: {
        status: 400,
        message: 'Is not part of the game or already is ready',
        path: '/api/v1/attendeeReady',
        method: 'POST',
        requestId: 'N/A'
      }
    });
  });

  it('should return error when no token is provided', async () => {
    const response = await axiosInstance.post('/api/v1/attendeeReady', {
      gameId: createdGameId
    }).catch(error => error.response);

    expect(response.status).toBe(401);
    expect(response.data).toMatchObject({
      error: 'No token provided'
    });
  });

  it('should return error when an invalid gameId is provided', async () => {
    const response = await axiosInstance.post('/api/v1/attendeeReady', {
      gameId: 'invalid-game-id'
    }, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).catch(error => error.response);

    expect(response.status).toBe(400);
    expect(response.data).toMatchObject({
      error: {
        status: 400,
        message: 'Is not part of the game or already is ready',
        path: '/api/v1/attendeeReady',
        method: 'POST',
        requestId: 'N/A'
      }
    });
  });
});
