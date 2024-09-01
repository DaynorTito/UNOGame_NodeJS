import UserPlayer from '../../models/userPlayer.js';
import bcrypt from 'bcrypt';
import { Model } from 'sequelize';

jest.spyOn(Model.prototype, 'save').mockImplementation(async function () {
  return this;
});

jest.spyOn(UserPlayer, 'create').mockImplementation(async (data) => {
  const instance = new UserPlayer(data);
  await instance.save();
  return instance;
});

jest.spyOn(UserPlayer, 'update').mockImplementation(async (data, options) => {
  const instance = await UserPlayer.findByPk(options.where.id);
  if (instance) {
    Object.assign(instance, data);
    await instance.save();
  }
  return [1];
});

jest.mock('bcrypt', () => ({
  hash: jest.fn().mockResolvedValue('hashed_password'),
  compare: jest.fn().mockResolvedValue(true)
}));

describe('UserPlayer model', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Password hashing', () => {
    it('no debería hashear la contraseña si no cambia durante la actualización', async () => {
      const user = new UserPlayer();
      user.password = 'hashed_password';
      user.changed = jest.fn().mockReturnValue(false);

      await user.save();
      expect(bcrypt.hash).not.toHaveBeenCalled();
    });
  });

  describe('comparePassword method', () => {
    it('debería devolver true si la contraseña coincide', async () => {
      const user = new UserPlayer();
      user.password = 'hashed_password';
      
      const isMatch = await user.comparePassword('password123');
      expect(bcrypt.compare).toHaveBeenCalledWith('password123', 'hashed_password');
      expect(isMatch).toBe(true);
    });

    it('debería devolver false si la contraseña no coincide', async () => {
      bcrypt.compare.mockResolvedValueOnce(false);
      
      const user = new UserPlayer();
      user.password = 'hashed_password';
      
      const isMatch = await user.comparePassword('wrong_password');
      expect(bcrypt.compare).toHaveBeenCalledWith('wrong_password', 'hashed_password');
      expect(isMatch).toBe(false);
    });
  });
});