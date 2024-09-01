import IHistoryRepository from '../interfaces/IHistoryRepository.js';

export class HistoryRepository extends IHistoryRepository {

    async create(entity) {
        const history = await this.historyModel.create(entity);
        return history;
    }

    async findById(id) {
        const history = await this.historyModel.findByPk(id);
        return history;
    }

    async findAllByClause(whereClause) {
        const historys = await this.historyModel.findAll({ where: whereClause });
        return historys;
    }

    async findAll() {
        const historys = await this.historyModel.findAll();
        return historys;
    }

    async update(id, entity) {
        const history = await this.historyModel.findByPk(id);
        await history.update(entity);
        return history;
    }

    async delete(id) {
        const history = await this.historyModel.findByPk(id);
        await history.destroy();
        return true;
    }

    async findOneByClause(whereClause) {
        const history = await this.historyModel.findOne({ where: whereClause });
        return history;
    }
}
