import IScoreRepository from '../interfaces/IScoreRepository.js';

export class ScoreRepository extends IScoreRepository {

    async create(entity) {
        const score = await this.ScoreModel.create(entity);
        return score;
    }

    async findById(id) {
        const score = await this.ScoreModel.findByPk(id);
        return score;
    }

    async findAll() {
        const scores = await this.ScoreModel.findAll();
        return scores;
    }

    async update(id, entity) {
        const score = await this.ScoreModel.findByPk(id);
        await score.update(entity);
        return score;
    }

    async delete(id) {
        const score = await this.ScoreModel.findByPk(id);
        await score.destroy();
        return true;
    }
}
