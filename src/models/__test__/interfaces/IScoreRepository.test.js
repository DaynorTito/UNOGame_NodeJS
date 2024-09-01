import IScoreRepository from '../../interfaces/IScoreRepository.js';

describe('IScoreRepository', () => {
    let repository;

    beforeEach(() => {
        // Configura el objeto simulado para `gameModel`
        const mockGameModel = {};
        repository = new IScoreRepository({ gameModel: mockGameModel });
    });

    test('should throw error on create()', async () => {
        await expect(repository.create({})).rejects.toThrow("Method 'create()' must be implemented.");
    });

    test('should throw error on findById()', async () => {
        await expect(repository.findById(1)).rejects.toThrow("Method 'findById()' must be implemented.");
    });

    test('should throw error on findAll()', async () => {
        await expect(repository.findAll()).rejects.toThrow("Method 'findAll()' must be implemented.");
    });

    test('should throw error on update()', async () => {
        await expect(repository.update(1, {})).rejects.toThrow("Method 'update()' must be implemented.");
    });

    test('should throw error on delete()', async () => {
        await expect(repository.delete(1)).rejects.toThrow("Method 'delete()' must be implemented.");
    });
});
