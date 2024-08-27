import IDiscardCardRepository from '../interfaces/IDiscardCardRepository.js';


export class DiscardCardRepository extends IDiscardCardRepository {

    async create(entity) {
        const discard = await this.DiscardModel.create(entity);
        return discard;
    }

    async findById(id) {
        const card = await this.DiscardModel.findByPk(id);
        return card;
    }

    async findAll() {
        const discards = await this.DiscardModel.findAll();
        return discards;
    }

    async findAllByClause(whereClause) {
        const discards = await this.DiscardModel.findAll({ where: whereClause });
        return discards;
    }

    async update(id, entity) {
        const card = await this.DiscardModel.findByPk(id);
        await card.update(entity);
        return card;
    }

    async delete(id) {
        const card = await this.DiscardModel.findByPk(id);
        await card.destroy();
        return true;
    }

    async bulkCreate(entities) {
        return await this.DiscardModel.bulkCreate(entities);
    }

    async findOneByClause(whereClause) {
        const discards = await this.DiscardModel.findOne({ where: whereClause });
        return discards;
    }
}
