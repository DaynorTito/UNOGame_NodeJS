export default class IDiscardCardRepository {
    
    constructor({ discardModel }) {
        this.DiscardModel = discardModel;
    }

    async create(entity) {
        throw new Error("Method 'create()' must be implemented.");
    }

    async findById(id) {
        throw new Error("Method 'findById()' must be implemented.");
    }

    async findAll() {
        throw new Error("Method 'findAll()' must be implemented.");
    }

    async findAllByClause(whereClause) {
        throw new Error("Method 'findAllByClause()' must be implemented.");
    }

    async update(id, entity) {
        throw new Error("Method 'update()' must be implemented.");
    }

    async delete(id) {
        throw new Error("Method 'delete()' must be implemented.");
    }

    async bulkCreate(entities) {
        throw new Error("Method 'bulkCreate()' must be implemented.");
    }

    async findOneByClause(entiwhereClauseties) {
        throw new Error("Method 'findOneByClause()' must be implemented.");
    }
}
