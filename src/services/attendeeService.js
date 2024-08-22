import { NotFoundError } from "../errors/customError.js";
import container from "../config/container.js"

const attendeeRepository = container.resolve('attendeeRepository');

const getAttendeesService = async () => {
    return await attendeeRepository.findAll();
};

const getAttendeeByIdService = async (id) => {
    return await attendeeRepository.findById(id);
};

const updateAttendeeService = async (id, updateData) => {
    const attendee = await attendeeRepository.findById(id);
    if (attendee) {
      await attendeeRepository.update(id, updateData);
      return attendee;
    }
    throw new NotFoundError('Attendee not found');
  };

const deleteAttendeeService = async(id) => {
    const attendee = await attendeeRepository.findById(id);
    if (attendee) {
        await attendeeRepository.delete(id);
        return true;
    }
    throw new Error('Attendee not found');
};

export default {
    getAttendeesService,
    getAttendeeByIdService,
    updateAttendeeService,
    deleteAttendeeService,
};
