import IApiUsageRepository from '../interfaces/IApiUsageRepository.js';

export class ApiUsageRepository extends IApiUsageRepository {

    async create(entity) {
        const apiUsage = await this.ApiUsageModel.create(entity);
        return apiUsage;
    }

    async findAllByClause(whereClause) {
        const apiUsages = await this.ApiUsageModel.findAll({ where: whereClause });
        return apiUsages;
    }

    async findAll() {
        const apiUsages = await this.ApiUsageModel.findAll();
        return apiUsages;
    }

    async findOneByClause(whereClause) {
        const apiUsage = await this.ApiUsageModel.findOne({ where: whereClause });
        return apiUsage;
    }
}
