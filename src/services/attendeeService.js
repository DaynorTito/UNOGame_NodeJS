import Attendee from "../models/attendee.js";

const createAttendeeService = async (attendeeData) => {
    return await Attendee.create(attendeeData);
};

const getAttendeesService = async () => {
    return await Attendee.findAll();
};

const getAttendeeByIdService = async (id) => {
    return await Attendee.findByPk(id);
};

const updateAttendeeService = async (id, updateData) => {
    const attendee = await Attendee.findByPk(id);
    if (attendee) {
        await attendee.update(updateData);
        return attendee;
    }
    throw new Error('Attendee not found');
};

const deleteAttendeeService = async(id) => {
    const attendee = await Attendee.findByPk(id);
    if (attendee) {
        await attendee.destroy();
        return true;
    }
    throw new Error('Attendee not found');
};

export {createAttendeeService, 
    getAttendeesService,
    getAttendeeByIdService,
    updateAttendeeService,
    deleteAttendeeService
};
