import ICardRepository from '../interfaces/ICardRepository.js';

export class CardRepository extends ICardRepository {

    async create(entity) {
        const card = await this.CardModel.create(entity);
        return card;
    }

    async findById(id) {
        const card = await this.CardModel.findByPk(id);
        return card;
    }

    async findAll() {
        const cards = await this.CardModel.findAll();
        return cards;
    }

    async findAllByClause(whereClause) {
        const cards = await this.CardModel.findAll({where: whereClause});
        return cards;
    }

    async update(id, entity) {
        const card = await this.CardModel.findByPk(id);
        await card.update(entity);
        return card;
    }

    async delete(id) {
        const card = await this.CardModel.findByPk(id);
        await card.destroy();
        return true;
    }
}
