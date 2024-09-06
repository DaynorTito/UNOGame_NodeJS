import axios from 'axios';

describe('API End-to-End Tests - User Registration for Multiple Users', () => {
  let axiosInstance;
  const createdUserIds = [];

  beforeAll(() => {
    axiosInstance = axios.create({ baseURL: 'http://localhost:3000' });
  });

  const usersToRegister = [
    { username: 'daynor123', email: 'daynor123@gmail.com', age: 21, password: 'daynor123' },
    { username: 'maria456', email: 'maria456@hotmail.com', age: 25, password: 'maria456' },
    { username: 'juan789', email: 'juan789@yahoo.com', age: 30, password: 'juan789' },
    { username: 'luis321', email: 'luis321@outlook.com', age: 28, password: 'luis321' }
  ];

  usersToRegister.forEach((user) => {
    it(`should register user ${user.username} successfully`, async () => {
      try {
        const response = await axiosInstance.post('/api/v1/register', user);

        expect(response.status).toBe(200);
        expect(response.data).toMatchObject({
          message: 'User registered successfully',
          userId: expect.any(String)
        });

        expect(response.data.userId).toHaveLength(36);

        createdUserIds.push(response.data.userId);
      } catch (error) {
        console.error(`Error during registration for user ${user.username}:`, error.message);
        throw error;
      }
    });
  });

  it('should fail to register a user with an existing username', async () => {
    const duplicatedUsernameUser = {
      username: 'daynor123',
      email: 'newemail@gmail.com',
      age: 22,
      password: 'newpassword'
    };

    try {
      await axiosInstance.post('/api/v1/register', duplicatedUsernameUser);
    } catch (error) {
      expect(error.response.status).toBe(409);
      expect(error.response.data).toMatchObject({
        error: {
          status: 409,
          message: 'User already exists',
          path: '/api/v1/register',
          method: 'POST',
          requestId: 'N/A'
        }
      });
    }
  });

  it('should fail to register a user with an existing email', async () => {
    const duplicatedEmailUser = {
      username: 'newuser123',
      email: 'daynor123@gmail.com',
      age: 22,
      password: 'anotherpassword'
    };

    try {
      await axiosInstance.post('/api/v1/register', duplicatedEmailUser);
    } catch (error) {
      expect(error.response.status).not.toBe(200);
      expect(error.response.data.error.message).toBe("Validation error");
    }
  });

  afterAll(async () => {
    for (const userId of createdUserIds) {
      try {
        const response = await axiosInstance.delete(`/api/v1/users/${userId}`);
        expect(response.status).toBe(204);
      } catch (error) {
        console.error(`Error deleting user with ID ${userId}:`, error.message);
      }
    }
  });
});
