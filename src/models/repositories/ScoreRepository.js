import IScoreRepository from '../interfaces/IScoreRepository.js';

export class ScoreRepository extends IScoreRepository {

    async create(entity) {
        const score = await this.GameModel.create(entity);
        return score;
    }

    async findById(id) {
        const score = await this.GameModel.findByPk(id);
        return score;
    }

    async findAll() {
        const scores = await this.GameModel.findAll();
        return scores;
    }

    async update(id, entity) {
        const score = await this.GameModel.findByPk(id);
        await score.update(entity);
        return score;
    }

    async delete(id) {
        const score = await this.GameModel.findByPk(id);
        await score.destroy();
        return true;
    }
}
