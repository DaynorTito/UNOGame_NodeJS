import dotenv from 'dotenv';
import { initDatabase } from '../database.js';
import { Sequelize } from 'sequelize';
dotenv.config();

jest.mock('sequelize', () => {
  const SequelizeMock = jest.fn().mockImplementation(() => ({
    sync: jest.fn(),
  }));

  return {
    Sequelize: SequelizeMock,
  };
});

describe('initDatabase', () => {
  let sequelizeMock;

  beforeEach(() => {
    jest.clearAllMocks();
    
    sequelizeMock = new Sequelize();
  });

  test('should log success message on successful sync', async () => {
    sequelizeMock.sync.mockResolvedValueOnce('Tables have been created');

    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
    await initDatabase();
    expect(consoleLogSpy).toHaveBeenCalledWith('Tables have been created');
    consoleLogSpy.mockRestore();
  });
});