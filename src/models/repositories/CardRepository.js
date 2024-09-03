import ICardRepository from '../interfaces/ICardRepository.js';
import { CacheManager } from '../../middlewares/cache/CacheManager.js'
export class CardRepository extends ICardRepository {

    constructor({ cardModel }) {
        super({ cardModel });
        this.cacheManager = new CacheManager(200, 180000);
    }

    async create(entity) {
        const card = await this.CardModel.create(entity);
        return card;
    }

    async findById(id) {
        const cacheKey = `card-findById-${id}`;
        const cachedData = this.cacheManager.get(cacheKey);

        if (cachedData) {
            console.log(`[CACHE] Using cached data card for findById(${id})`);
            return cachedData;
        }

        const card = await this.CardModel.findByPk(id);
        this.cacheManager.set(cacheKey, card);
        return card;
    }

    async findAll() {
        const cacheKey = 'card-findAll';
        const cachedData = this.cacheManager.get(cacheKey);
        if (cachedData) {
            console.log(`[CACHE] Using cached cards data for findAll`);
            return cachedData;
        }
        const cards = await this.CardModel.findAll();
        this.cacheManager.set(cacheKey, cards);
        return cards;
    }

    async findAllByClause(whereClause) {
        const cacheKey = `card-findAllByClause-${JSON.stringify(whereClause)}`;
        const cachedData = this.cacheManager.get(cacheKey);

        if (cachedData) {
            console.log(`[CACHE] Using cached data card for findAllByClause(${JSON.stringify(whereClause)})`);
            return cachedData;
        }
        const cards = await this.CardModel.findAll({ where: whereClause });
        this.cacheManager.set(cacheKey, cards);
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
