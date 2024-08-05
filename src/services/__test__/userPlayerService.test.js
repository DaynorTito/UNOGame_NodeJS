import { getUserPlayersService,
    getUserPlayerByIdService,
    registerUserPlayerService,
    updateUserPlayerService,
    getUserPlayerByname,
    deleteUserPlayerService
} from "../userPlayerService.js";
import UserPlayer from '../../models/userPlayer.js';

jest.mock("../../models/userPlayer.js");


beforeEach(() => {
    jest.clearAllMocks();
});

test('registerUserPlayerService should throw AlreadyExistsError if user already exists', async () => {
    const mockUserData = { id: 1, name: 'John Doe' };
    UserPlayer.findByPk.mockResolvedValue(mockUserData);
    await expect(registerUserPlayerService(mockUserData)).rejects.toThrow('User already exists');
});

test('registerUserPlayerService should create a new user if user does not exist', async () => {
    const mockUserData = { id: 1, name: 'John Doe' };
    UserPlayer.create.mockResolvedValue(mockUserData);
    UserPlayer.findByPk.mockResolvedValue(null);
    const result = await registerUserPlayerService(mockUserData);
    expect(result).toEqual(mockUserData);
});

test('getUserPlayersService should return all user players', async () => {
    const mockUserPlayers = [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Smith' }
    ];
    UserPlayer.findAll.mockResolvedValue(mockUserPlayers);
    const result = await getUserPlayersService();
    expect(result).toEqual(mockUserPlayers);
});

test('getUserPlayerByIdService should return user player by ID', async () => {
    const mockUserPlayer = { id: 1, name: 'John Doe' };
    UserPlayer.findByPk.mockResolvedValue(mockUserPlayer);
    const userId = 1;
    const result = await getUserPlayerByIdService(userId);
    expect(result).toEqual(mockUserPlayer);
});

test('should update a user player correctly', async () => {
    const mockUser = {id: 1, username: 'oldUsername',
      update: jest.fn().mockImplementation(function(data) {
        Object.assign(this, data);
        return this;
      })
    };

    UserPlayer.findByPk.mockResolvedValue(mockUser);
    const updateData = { username: 'newUsername' };
    const result = await updateUserPlayerService(1, updateData);

    expect(UserPlayer.findByPk).toHaveBeenCalledWith(1);
    expect(mockUser.update).toHaveBeenCalledWith(updateData);
    expect(result).toEqual({id: 1,username: 'newUsername',update: expect.any(Function)
    });
});

test('should throw NotFoundError when user player does not exist', async () => {
    UserPlayer.findByPk.mockResolvedValue(null);
    await expect(updateUserPlayerService(1, { username: 'newUsername' }))
      .rejects.toThrow('UserPlayer not found');
});

test('should delete a user player and return true when user exists', async () => {
    const mockUser = {id: 1, destroy: jest.fn().mockResolvedValue(true)};
    UserPlayer.findByPk.mockResolvedValue(mockUser);
    const result = await deleteUserPlayerService(1);
    expect(UserPlayer.findByPk).toHaveBeenCalledWith(1);
    expect(mockUser.destroy).toHaveBeenCalled();
    expect(result).toBe(true);
});

test('should throw NotFoundError when user player does not exist', async () => {
    UserPlayer.findByPk.mockResolvedValue(null);
    await expect(deleteUserPlayerService(1))
      .rejects.toThrow('UserPlayer not found');
});

test('should return a user player when found', async () => {
    const mockUser = {id: 1, username: 'testUser'};
    UserPlayer.findOne.mockResolvedValue(mockUser);
    const result = await getUserPlayerByname('testUser');
    expect(UserPlayer.findOne).toHaveBeenCalledWith({ where: { username: 'testUser' } });
    expect(result).toEqual(mockUser);
});

