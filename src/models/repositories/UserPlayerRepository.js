import IUserPlayerRepository from '../interfaces/IUserPlayerRepository.js';

export class UserPlayerRepository extends IUserPlayerRepository {

    async create(entity) {
        const userPlayer = await this.UserPlayerModel.create(entity);
        return userPlayer;
    }

    async findById(id) {
        const userPlayer = await this.UserPlayerModel.findByPk(id);
        return userPlayer;
    }

    async findAll() {
        const userPlayers = await this.UserPlayerModel.findAll();
        return userPlayers;
    }
    async findAllByClause(whereClause) {
        const userPlayers = await this.UserPlayerModel.findAll({ where: whereClause });
        return userPlayers;
    }

    async findAllByIds(attendees) {
        const attendee = await this.UserPlayerModel.findAll({where: {id: attendees}, attributes: ['username']});
        return attendee;
    }

    async update(id, entity) {
        const userPlayer = await this.UserPlayerModel.findByPk(id);
        await userPlayer.update(entity);
        return userPlayer;
    }

    async delete(id) {
        const userPlayer = await this.UserPlayerModel.findByPk(id);
        await userPlayer.destroy();
        return true;
    }

    async findOneByClause(whereClause) {
        const userPlayer = await this.UserPlayerModel.findOne({ where: whereClause });
        return userPlayer;
    }
}
