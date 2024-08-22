
export default class IUserPlayerRepository {
    
    constructor({ userPlayerModel }) {
        this.UserPlayerModel = userPlayerModel;
    }

    async create(entity) {
        throw new Error("Method 'create()' must be implemented.");
    }

    async findById(id) {
        throw new Error("Method 'findById()' must be implemented.");
    }

    async findAllByIds(attendees) {
        throw new Error("Method 'findById()' must be implemented.");
    }

    async findAll() {
        throw new Error("Method 'findAll()' must be implemented.");
    }

    async update(id, entity) {
        throw new Error("Method 'update()' must be implemented.");
    }

    async delete(id) {
        throw new Error("Method 'delete()' must be implemented.");
    }

    async findOneByClause(whereClause) {
        throw new Error("Method 'findOneByClause()' must be implemented.");
    }
}
