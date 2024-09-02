
export default class IApiUsageRepository {
    
    constructor({ apiUsageModel }) {
        this.ApiUsageModel = apiUsageModel;
    }

    async create(entity) {
        throw new Error("Method 'create()' must be implemented.");
    }

    async findAll() {
        throw new Error("Method 'findAll()' must be implemented.");
    }

    async findAllByClause(whereClause) {
        throw new Error("Method 'findAllByClause()' must be implemented.");
    }

    async findOneByClause(whereClause) {
        throw new Error("Method 'findOneByClause()' must be implemented.");
    }
}
