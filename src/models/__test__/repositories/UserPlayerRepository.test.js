import { UserPlayerRepository } from '../../repositories/UserPlayerRepository.js';
import { mockDeep, mockReset, mock } from 'jest-mock-extended';

describe('UserPlayerRepository', () => {
    let repository;
    let mockUserPlayerModel;

    beforeEach(() => {
        // Create a deep mock object for the UserPlayerModel with all required methods
        mockUserPlayerModel = mockDeep();
        repository = new UserPlayerRepository({ userPlayerModel: mockUserPlayerModel });
    });

    afterEach(() => {
        // Reset the mock after each test
        mockReset(mockUserPlayerModel);
    });

    test('should create a user player', async () => {
        const userPlayer = { id: 1, username: 'player1' };
        // Ensure the mock resolves to the expected userPlayer
        mockUserPlayerModel.create.mockResolvedValue(userPlayer);

        const result = await repository.create(userPlayer);

        expect(mockUserPlayerModel.create).toHaveBeenCalledWith(userPlayer);
        expect(result).toBe(userPlayer);
    });

    test('should find a user player by id', async () => {
        const userPlayer = { id: 1, username: 'player1' };
        // Ensure the mock resolves to the expected userPlayer
        mockUserPlayerModel.findByPk.mockResolvedValue(userPlayer);

        const result = await repository.findById(1);

        expect(mockUserPlayerModel.findByPk).toHaveBeenCalledWith(1);
        expect(result).toBe(userPlayer);
    });

    test('should find all user players', async () => {
        const userPlayers = [{ id: 1, username: 'player1' }, { id: 2, username: 'player2' }];
        // Ensure the mock resolves to the expected userPlayers
        mockUserPlayerModel.findAll.mockResolvedValue(userPlayers);

        const result = await repository.findAll();

        expect(mockUserPlayerModel.findAll).toHaveBeenCalled();
        expect(result).toBe(userPlayers);
    });

    test('should find all user players by clause', async () => {
        const whereClause = { username: 'player1' };
        const userPlayers = [{ id: 1, username: 'player1' }];
        // Ensure the mock resolves to the expected userPlayers with the whereClause
        mockUserPlayerModel.findAll.mockResolvedValue(userPlayers);

        const result = await repository.findAllByClause(whereClause);

        expect(mockUserPlayerModel.findAll).toHaveBeenCalledWith({ where: whereClause });
        expect(result).toBe(userPlayers);
    });

    test('should find all user players by ids', async () => {
        const ids = [1, 2];
        const userPlayers = [{ id: 1, username: 'player1' }, { id: 2, username: 'player2' }];
        // Ensure the mock resolves to the expected userPlayers with the ids
        mockUserPlayerModel.findAll.mockResolvedValue(userPlayers);

        const result = await repository.findAllByIds(ids);

        expect(mockUserPlayerModel.findAll).toHaveBeenCalledWith({ where: { id: ids }, attributes: ['username'] });
        expect(result).toBe(userPlayers);
    });

    test('should update a user player', async () => {
        const userPlayer = { id: 1, username: 'player1', update: jest.fn() };
        const updatedUserPlayer = { id: 1, username: 'updatedPlayer' };

        // Ensure the mock resolves to the expected userPlayer and mock update method
        mockUserPlayerModel.findByPk.mockResolvedValue(userPlayer);
        userPlayer.update.mockResolvedValue(updatedUserPlayer);

        const result = await repository.update(1, { username: 'updatedPlayer' });

        expect(mockUserPlayerModel.findByPk).toHaveBeenCalledWith(1);
        expect(userPlayer.update).toHaveBeenCalledWith({ username: 'updatedPlayer' });
    });

    test('should delete a user player', async () => {
        const userPlayer = { id: 1, username: 'player1', destroy: jest.fn() };

        // Ensure the mock resolves to the expected userPlayer and mock destroy method
        mockUserPlayerModel.findByPk.mockResolvedValue(userPlayer);
        userPlayer.destroy.mockResolvedValue(true);

        const result = await repository.delete(1);

        expect(mockUserPlayerModel.findByPk).toHaveBeenCalledWith(1);
        expect(userPlayer.destroy).toHaveBeenCalled();
        expect(result).toBe(true);
    });

    test('should find one user player by clause', async () => {
        const whereClause = { username: 'player1' };
        const userPlayer = { id: 1, username: 'player1' };
        // Ensure the mock resolves to the expected userPlayer with the whereClause
        mockUserPlayerModel.findOne.mockResolvedValue(userPlayer);

        const result = await repository.findOneByClause(whereClause);

        expect(mockUserPlayerModel.findOne).toHaveBeenCalledWith({ where: whereClause });
        expect(result).toBe(userPlayer);
    });
});
