import { AttendeeRepository } from '../../repositories/AttendeeRepository.js';
import { mockDeep, mockReset } from 'jest-mock-extended';
import { AttendeeModel } from '../../attendee.js';

describe('AttendeeRepository', () => {
    let repository;
    let mockAttendeeModel;

    beforeEach(() => {
        // Resetea el mock antes de cada test
        mockAttendeeModel = mockDeep();
        repository = new AttendeeRepository({ attendeeModel: mockAttendeeModel });
    });

    afterEach(() => {
        // Limpia el estado de los mocks después de cada test
        mockReset(mockAttendeeModel);
    });

    test('should create an attendee', async () => {
        const attendee = { id: 1, name: 'John Doe' };
        mockAttendeeModel.create.mockResolvedValue(attendee);

        const result = await repository.create(attendee);

        expect(mockAttendeeModel.create).toHaveBeenCalledWith(attendee);
        expect(result).toBe(attendee);
    });

    test('should find an attendee by id', async () => {
        const attendee = { id: 1, name: 'John Doe' };
        mockAttendeeModel.findByPk.mockResolvedValue(attendee);

        const result = await repository.findById(1);

        expect(mockAttendeeModel.findByPk).toHaveBeenCalledWith(1);
        expect(result).toBe(attendee);
    });

    test('should find all attendees', async () => {
        const attendees = [{ id: 1, name: 'John Doe' }, { id: 2, name: 'Jane Doe' }];
        mockAttendeeModel.findAll.mockResolvedValue(attendees);

        const result = await repository.findAll();

        expect(mockAttendeeModel.findAll).toHaveBeenCalled();
        expect(result).toBe(attendees);
    });

    test('should find all attendees by clause', async () => {
        const attendees = [{ id: 1, name: 'John Doe' }];
        const whereClause = { name: 'John Doe' };
        mockAttendeeModel.findAll.mockResolvedValue(attendees);

        const result = await repository.findAllByClause(whereClause);

        expect(mockAttendeeModel.findAll).toHaveBeenCalledWith({ where: whereClause });
        expect(result).toBe(attendees);
    });

    test('should update an attendee', async () => {
        const attendee = { id: 1, name: 'John Doe', update: jest.fn() };
        const updatedAttendee = { id: 1, name: 'John Smith', update: jest.fn() };
    
        mockAttendeeModel.findByPk.mockResolvedValue(attendee);
        
        attendee.update.mockImplementation((updatedData) => {
            return { ...attendee, ...updatedData };
        });
    
        const result = await repository.update(1, { name: 'John Smith' });
    
        expect(mockAttendeeModel.findByPk).toHaveBeenCalledWith(1);
        expect(attendee.update).toHaveBeenCalledWith({ name: 'John Smith' });
    });
    
    test('should delete an attendee', async () => {
        const attendee = { id: 1, name: 'John Doe', destroy: jest.fn().mockResolvedValue() };
        mockAttendeeModel.findByPk.mockResolvedValue(attendee);

        const result = await repository.delete(1);

        expect(mockAttendeeModel.findByPk).toHaveBeenCalledWith(1);
        expect(attendee.destroy).toHaveBeenCalled();
        expect(result).toBe(true);
    });

    test('should find one attendee by clause', async () => {
        const attendee = { id: 1, name: 'John Doe' };
        const whereClause = { name: 'John Doe' };
        mockAttendeeModel.findOne.mockResolvedValue(attendee);

        const result = await repository.findOneByClause(whereClause);

        expect(mockAttendeeModel.findOne).toHaveBeenCalledWith({ where: whereClause });
        expect(result).toBe(attendee);
    });

    test('should count attendees by clause', async () => {
        const count = 5;
        const whereClause = { name: 'John Doe' };
        mockAttendeeModel.count.mockResolvedValue(count);

        const result = await repository.count(whereClause);

        expect(mockAttendeeModel.count).toHaveBeenCalledWith({ where: whereClause });
        expect(result).toBe(count);
    });
});
