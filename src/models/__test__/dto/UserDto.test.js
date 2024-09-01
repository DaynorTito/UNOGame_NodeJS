import { UserDto } from '../../dto/UserDto.js';

describe('UserDto', () => {
  let dbUser;

  beforeEach(() => {
    // Set up a default dbUser object before each test
    dbUser = {
      username: 'johndoe',
      age: 30,
      email: 'johndoe@example.com'
    };
  });

  test('should create an instance with given dbUser', () => {
    const userDto = new UserDto(dbUser);
    expect(userDto.dbUser).toBe(dbUser);
  });

  test('should return the correct user object from getUser', () => {
    const userDto = new UserDto(dbUser);
    const expectedUser = {
      username: 'johndoe',
      age: 30,
      email: 'johndoe@example.com'
    };

    expect(userDto.getUser()).toEqual(expectedUser);
  });

  test('should return a user object with correct properties', () => {
    const userDto = new UserDto({
      username: 'janedoe',
      age: 25,
      email: 'janedoe@example.com'
    });

    const user = userDto.getUser();
    expect(user.username).toBe('janedoe');
    expect(user.age).toBe(25);
    expect(user.email).toBe('janedoe@example.com');
  });
});
