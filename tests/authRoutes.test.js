import axios from 'axios';
import { response } from 'express';

describe('API End-to-End Tests - User Login', () => {
  let axiosInstance;
  let userCreatedId;
  let accessToken;

  const testUser = {
    username: 'daynor123',
    email: 'daynor123@gmail.com',
    age: 21,
    password: 'daynor123'
  };

  beforeAll(async () => {
    axiosInstance = axios.create({ baseURL: 'http://localhost:3000' });

    try {
      const response = await axiosInstance.post('/api/v1/register', testUser);
      userCreatedId = response.data.userId;
    } catch (error) {
      if (error.response && error.response.status === 409) {
        console.log('User already exist');
      } else {
        console.error('Error to crerate a user', error.message);
        throw error;
      }
    }
  });

  
  it('should log in successfully with correct credentials', async () => {
    const loginData = {
      username: 'daynor123',
      password: 'daynor123'
    };

    try {
      const response = await axiosInstance.post('/api/v1/login', loginData);
      accessToken = response.data.access_token; 
      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty('access_token');
      expect(typeof response.data.access_token).toBe('string');
    } catch (error) {
      console.error('Error during login with correct credentials:', error.message);
      throw error;
    }
  });

  it('should fail to log in with incorrect credentials', async () => {
    const incorrectLoginData = {
      username: 'daynor123',
      password: 'wrongpassword'
    };

    try {
      await axiosInstance.post('/api/v1/login', incorrectLoginData);
    } catch (error) {
      expect(error.response.status).toBe(401);
      expect(error.response.data.error.message).toBe("Invalid password");
    }
  });

  it('should fail to log in with an empty username', async () => {
    const emptyUsernameData = {
      username: '',
      password: 'daynor123'
    };

    try {
      await axiosInstance.post('/api/v1/login', emptyUsernameData);
    } catch (error) {
      expect(error.response.status).toBe(400);
      expect(error.response.data).toMatchObject({
        error: '"username" is not allowed to be empty'
      });
    }
  });

  it('should retrieve user information with valid token', async () => {
    try {
      const response = await axiosInstance.get('/api/v1/infuser', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      expect(response.status).toBe(200);
      expect(response.data).toMatchObject({
        username: 'daynor123',
        email: 'daynor123@gmail.com'
      });
    } catch (error) {
      console.error('Error retrieving user info:', error.message);
      throw error;
    }
  });


  afterAll(async () => {
      try {
        const response = await axiosInstance.delete(`/api/v1/users/${userCreatedId}`);
        expect(response.status).toBe(204);
      } catch (error) {
        console.error(`Error deleting user with ID ${userCreatedId}:`, error.message);
      }
  });
});
