import axios from 'axios';

describe('POST /api/v1/startGame Tests', () => {
  let axiosInstance;
  let accessTokenUser1, accessTokenUser2;
  let createdUserId1, createdUserId2;
  let createdGameId;
  let attendee1, attendee2;

  beforeAll(async () => {
    axiosInstance = axios.create({ baseURL: 'http://localhost:3000' });

    const userResponse1 = await axiosInstance.post('/api/v1/register', {
      username: 'userStartGameTest1',
      email: 'userStartGameTest1@example.com',
      age: 25,
      password: 'securePassword123'
    });
    createdUserId1 = userResponse1.data.userId;

    const loginResponse1 = await axiosInstance.post('/api/v1/login', {
      username: 'userStartGameTest1',
      password: 'securePassword123'
    });
    accessTokenUser1 = loginResponse1.data.access_token;

    const userResponse2 = await axiosInstance.post('/api/v1/register', {
      username: 'userStartGameTest2',
      email: 'userStartGameTest2@example.com',
      age: 30,
      password: 'securePassword456'
    });
    createdUserId2 = userResponse2.data.userId;

    const loginResponse2 = await axiosInstance.post('/api/v1/login', {
      username: 'userStartGameTest2',
      password: 'securePassword456'
    });
    accessTokenUser2 = loginResponse2.data.access_token;

    const gameResponse = await axiosInstance.post('/api/v1/games', {
      title: 'Ready Game Test',
      maxPlayers: 4,
      rules: 'Standard Rules'
    }, {
      headers: {
        Authorization: `Bearer ${accessTokenUser1}`
      }
    });
    createdGameId = gameResponse.data.id;

    const attendeeResponse1 = await axiosInstance.post('/api/v1/attendees', {
      gameId: createdGameId
    }, {
      headers: {
        Authorization: `Bearer ${accessTokenUser1}`
      }
    });
    attendee1 = attendeeResponse1.data.attendeeId;

    const attendeeResponse2 =  await axiosInstance.post('/api/v1/attendees', {
      gameId: createdGameId
    }, {
      headers: {
        Authorization: `Bearer ${accessTokenUser2}`
      }
    });
    attendee2 = attendeeResponse2.data.attendeeId;

    await axiosInstance.post('/api/v1/attendeeReady', {
      gameId: createdGameId
    }, {
      headers: {
        Authorization: `Bearer ${accessTokenUser1}`
      }
    });
  });

  afterAll(async () => {
    try {
      await axiosInstance.delete(`/api/v1/attendees/${attendee1}`, {
        headers: {
          Authorization: `Bearer ${accessTokenUser1}`
        }
      });

      await axiosInstance.delete(`/api/v1/attendees/${attendee2}`, {
        headers: {
          Authorization: `Bearer ${accessTokenUser2}`
        }
      });

      await axiosInstance.delete(`/api/v1/games/${createdGameId}`, {
        headers: {
          Authorization: `Bearer ${accessTokenUser1}`
        }
      });
      await axiosInstance.delete(`/api/v1/users/${createdUserId1}`, {
        headers: {
          Authorization: `Bearer ${accessTokenUser1}`
        }
      });

      await axiosInstance.delete(`/api/v1/users/${createdUserId2}`, {
        headers: {
          Authorization: `Bearer ${accessTokenUser2}`
        }
      });

    } catch (error) {
      console.error('Error during cleanup:', error.message);
      throw error;
    }
  });

  it('should return 400 if the creator tries to start the game when not all users are ready', async () => {
    const response = await axiosInstance.post('/api/v1/startGame', {
      gameId: createdGameId
    }, {
      headers: {
        Authorization: `Bearer ${accessTokenUser1}`
      }
    }).catch(error => error.response);

    expect(response.status).toBe(400);
    expect(response.data).toMatchObject({
      error: {
        status: 400,
        message: 'Not all attendees are ready',
        path: '/api/v1/startGame',
        method: 'POST',
        requestId: 'N/A'
      }
    });
  });

  it('should return 400 if a non-creator user tries to start the game', async () => {
    await axiosInstance.post('/api/v1/attendeeReady', {
      gameId: createdGameId
    }, {
      headers: {
        Authorization: `Bearer ${accessTokenUser2}`
      }
    });

    const response = await axiosInstance.post('/api/v1/startGame', {
      gameId: createdGameId
    }, {
      headers: {
        Authorization: `Bearer ${accessTokenUser2}`
      }
    }).catch(error => error.response);

    expect(response.status).toBe(401);
    expect(response.data).toMatchObject({
      error: {
        status: 401,
        message: 'You cannot start the game',
        path: '/api/v1/startGame',
        method: 'POST',
        requestId: 'N/A'
      }
    });
  });

  it('should start the game successfully when all users are ready and the creator initiates it', async () => {
    const response = await axiosInstance.post('/api/v1/startGame', {
      gameId: createdGameId
    }, {
      headers: {
        Authorization: `Bearer ${accessTokenUser1}`
      }
    });

    expect(response.status).toBe(200);

  });
});
