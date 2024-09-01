import { GameRepository } from '../../repositories/GameRepository.js';
import { mockDeep, mockReset } from 'jest-mock-extended';

describe('GameRepository', () => {
    let repository;
    let mockGameModel;

    beforeEach(() => {
        mockGameModel = mockDeep();
        repository = new GameRepository({ gameModel: mockGameModel });
    });

    afterEach(() => {
        mockReset(mockGameModel);
    });

    test('should create a game', async () => {
        const game = { id: 1, name: 'Game 1' };
        mockGameModel.create.mockResolvedValue(game);

        const result = await repository.create(game);

        expect(mockGameModel.create).toHaveBeenCalledWith(game);
        expect(result).toBe(game);
    });

    test('should find a game by id', async () => {
        const game = { id: 1, name: 'Game 1' };
        mockGameModel.findByPk.mockResolvedValue(game);

        const result = await repository.findById(1);

        expect(mockGameModel.findByPk).toHaveBeenCalledWith(1);
        expect(result).toBe(game);
    });

    test('should find all games by clause', async () => {
        const games = [{ id: 1, name: 'Game 1' }];
        const whereClause = { name: 'Game 1' };
        mockGameModel.findAll.mockResolvedValue(games);

        const result = await repository.findAllByClause(whereClause);

        expect(mockGameModel.findAll).toHaveBeenCalledWith({ where: whereClause });
        expect(result).toBe(games);
    });

    test('should find all games', async () => {
        const games = [{ id: 1, name: 'Game 1' }, { id: 2, name: 'Game 2' }];
        mockGameModel.findAll.mockResolvedValue(games);

        const result = await repository.findAll();

        expect(mockGameModel.findAll).toHaveBeenCalled();
        expect(result).toBe(games);
    });

    test('should update a game', async () => {
        const game = { id: 1, name: 'Game 1', update: jest.fn() };
        const updatedGame = { id: 1, name: 'Updated Game 1' };

        mockGameModel.findByPk.mockResolvedValue(game);
        game.update.mockResolvedValue(updatedGame);

        const result = await repository.update(1, { name: 'Updated Game 1' });

        expect(mockGameModel.findByPk).toHaveBeenCalledWith(1);
        expect(game.update).toHaveBeenCalledWith({ name: 'Updated Game 1' });
    });

    test('should delete a game', async () => {
        const game = { id: 1, name: 'Game 1', destroy: jest.fn() };

        mockGameModel.findByPk.mockResolvedValue(game);
        game.destroy.mockResolvedValue(true);

        const result = await repository.delete(1);

        expect(mockGameModel.findByPk).toHaveBeenCalledWith(1);
        expect(game.destroy).toHaveBeenCalled();
        expect(result).toBe(true);
    });

    test('should find one game by clause', async () => {
        const game = { id: 1, name: 'Game 1' };
        const whereClause = { name: 'Game 1' };
        mockGameModel.findOne.mockResolvedValue(game);

        const result = await repository.findOneByClause(whereClause);

        expect(mockGameModel.findOne).toHaveBeenCalledWith({ where: whereClause });
        expect(result).toBe(game);
    });
});
