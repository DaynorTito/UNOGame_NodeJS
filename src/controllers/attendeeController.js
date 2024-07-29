import { 
    createAttendeeService, 
    getAttendeesService, 
    getAttendeeByIdService, 
    updateAttendeeService, 
    deleteAttendeeService,
    leaveAttendeeService,
    markAsReady
} from "../services/attendeeService.js";

const createAttendee = async (req, res, next) => {
    try {
        const attendee = await createAttendeeService(req.body, req.user);
        res.status(201).json({message: 'User joined the game successfully'});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAttendees =  async (req, res, next) => {
    try {
        const attendees = await getAttendeesService();
        res.status(200).json(attendees);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAttendeeById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const attendee = await getAttendeeByIdService(id);
        if (!attendee) {
            return res.status(404).json({ message: 'Attendee not found' });
        }
        res.status(200).json(attendee);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateAttendee = async (req, res, next) => {
    const { id } = req.params;
    try {
        const attendee = await updateAttendeeService(id, req.body);
        res.status(200).json(attendee);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteAttendee = async (req, res, next) => {
    const { id } = req.params;
    try {
        await deleteAttendeeService(id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const leaveAttendeeInProgess = async (req, res, next) => {
    const { gameId } = req.body;
    const user = req.user;
    try {
        await leaveAttendeeService(gameId, user.id);
        res.status(200).json({message: 'User left the game successfully'});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const userMarkAsReady = async (req, res, next) => {
    const { gameId } = req.body;
    const user = req.user;
    try {
        const attendee = await markAsReady(gameId, user.id);
        res.status(200).json({message: 'User mark as ready successfully'});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export {createAttendee, getAttendees, getAttendeeById, updateAttendee, deleteAttendee, leaveAttendeeInProgess, userMarkAsReady};