import IAttendeeRepository from '../interfaces/IAttendeeRepository.js';

export class AttendeeRepository extends IAttendeeRepository {

    async create(entity) {
        const attendee = await this.AttendeeModel.create(entity);
        return attendee;
    }

    async findById(id) {
        const attendee = await this.AttendeeModel.findByPk(id);
        return attendee;
    }

    async findAll() {
        const attendees = await this.AttendeeModel.findAll();
        return attendees;
    }

    async update(id, entity) {
        const attendee = await this.AttendeeModel.findByPk(id);
        await attendee.update(entity);
        return attendee;
    }

    async delete(id) {
        const attendee = await this.AttendeeModel.findByPk(id);
        await attendee.destroy();
        return true;
    }

    async findOneByClause(whereClause) {
        return await this.AttendeeModel.findOne({ where: whereClause });
    }

    async count(whereClause) {
        return await this.AttendeeModel.count({ where: whereClause });
    }
}
