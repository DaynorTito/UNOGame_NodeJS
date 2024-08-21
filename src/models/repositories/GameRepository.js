import IGameRepository from '../interfaces/IGameRepository.js';

export class GameRepository extends IGameRepository {

    async create(entity) {
        const game = await this.GameModel.create(entity);
        return game;
    }

    async findById(id) {
        const game = await this.GameModel.findByPk(id);
        return game;
    }

    async findAll() {
        const games = await this.GameModel.findAll();
        return games;
    }

    async update(id, entity) {
        const game = await this.GameModel.findByPk(id);
        await game.update(entity);
        return game;
    }

    async delete(id) {
        const game = await this.GameModel.findByPk(id);
        await game.destroy();
        return true;
    }

    async findOneByClause(whereClause) {
        const game = await this.GameModel.findOne({ where: whereClause });
        return game;
    }
}
