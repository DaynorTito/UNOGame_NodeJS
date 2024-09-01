import container from '../../../config/container.js';
import { Sequelize } from 'sequelize';
import yourModule from '../../attendees/informationAttendee.js'; // Reemplaza con la ruta correcta de tu módulo

const userPlayerRepository = container.resolve('userPlayerRepository');

describe('getPlayersFromAttendees', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('should return user players based on attendees', async () => {
        const mockAttendees = [{ userId: '1' }, { userId: '2' }];
        const mockUserPlayers = [
            { id: '1', username: 'User1' },
            { id: '2', username: 'User2' }
        ];

        jest.spyOn(userPlayerRepository, 'findAllByClause').mockResolvedValue(mockUserPlayers);

        const result = await yourModule.getPlayersFromAttendees(mockAttendees);

        expect(userPlayerRepository.findAllByClause).toHaveBeenCalledWith({ id: ['1', '2'] });
        expect(result).toEqual(mockUserPlayers);
    });

    it('should return an empty array if there are no attendees', async () => {
        const mockAttendees = [];
        const mockUserPlayers = [];

        jest.spyOn(userPlayerRepository, 'findAllByClause').mockResolvedValue(mockUserPlayers);

        const result = await yourModule.getPlayersFromAttendees(mockAttendees);

        expect(userPlayerRepository.findAllByClause).toHaveBeenCalledWith({ id: [] });
        expect(result).toEqual(mockUserPlayers);
    });

    it('should handle errors from the repository', async () => {
        const mockAttendees = [{ userId: '1' }, { userId: '2' }];
        const error = new Error('Database error');

        jest.spyOn(userPlayerRepository, 'findAllByClause').mockRejectedValue(error);

        await expect(yourModule.getPlayersFromAttendees(mockAttendees)).rejects.toThrow('Database error');
    });
});

describe('getUserPlayers', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('should return user players based on usernames', async () => {
        const mockPlayers = [{ username: 'User1' }, { username: 'User2' }];
        const mockUserPlayers = [
            { id: '1', username: 'User1' },
            { id: '2', username: 'User2' }
        ];

        jest.spyOn(userPlayerRepository, 'findAllByClause').mockResolvedValue(mockUserPlayers);

        const result = await yourModule.getUserPlayers(mockPlayers);

        expect(userPlayerRepository.findAllByClause).toHaveBeenCalledWith({
            username: { [Sequelize.Op.in]: ['User1', 'User2'] }
        });
        expect(result).toEqual(mockUserPlayers);
    });

    it('should return an empty array if there are no players', async () => {
        const mockPlayers = [];
        const mockUserPlayers = [];

        jest.spyOn(userPlayerRepository, 'findAllByClause').mockResolvedValue(mockUserPlayers);

        const result = await yourModule.getUserPlayers(mockPlayers);

        expect(userPlayerRepository.findAllByClause).toHaveBeenCalledWith({
            username: { [Sequelize.Op.in]: [] }
        });
        expect(result).toEqual(mockUserPlayers);
    });

    it('should handle errors from the repository', async () => {
        const mockPlayers = [{ username: 'User1' }, { username: 'User2' }];
        const error = new Error('Database error');

        jest.spyOn(userPlayerRepository, 'findAllByClause').mockRejectedValue(error);

        await expect(yourModule.getUserPlayers(mockPlayers)).rejects.toThrow('Database error');
    });
});
