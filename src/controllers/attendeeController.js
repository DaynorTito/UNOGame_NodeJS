import attendeeService from "../services/attendeeService.js";
import gameJoinService from "../services/game/gameJoinService.js";

const createAttendee = async (req, res, next) => {
    try {
        const attendee = await gameJoinService.joinGame(req.body, req.user);
        res.status(201).json({message: 'User joined the game successfully', userId: attendee.userId, attendeeId: attendee.id});
    } catch (error) {
        next(error);
    }
};

const getAttendees =  async (req, res, next) => {
    try {
        const attendees = await attendeeService.getAttendeesService();
        res.status(200).json(attendees);
    } catch (error) {
        next(error);
    }
};

const getAttendeeById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const attendee = await attendeeService.getAttendeeByIdService(id);
        if (!attendee) {
            return res.status(404).json({ message: 'Attendee not found' });
        }
        res.status(200).json(attendee);
    } catch (error) {
        next(error);
    }
};

const updateAttendee = async (req, res, next) => {
    const { id } = req.params;
    try {
        const attendee = await attendeeService.updateAttendeeService(id, req.body);
        res.status(200).json(attendee);
    } catch (error) {
        next(error);
    }
};

const deleteAttendee = async (req, res, next) => {
    const { id } = req.params;
    try {
        await attendeeService.deleteAttendeeService(id);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};

const leaveAttendeeInProgess = async (req, res, next) => {
    const { gameId } = req.body;
    const user = req.user;
    try {
        await gameJoinService.leaveAttendee(gameId, user.id);
        res.status(200).json({message: 'User left the game successfully'});
    } catch (error) {
        next(error);
    }
};

const userMarkAsReady = async (req, res, next) => {
    const { gameId } = req.body;
    const user = req.user;
    try {
        const attendee = await gameJoinService.markAsReady(gameId, user.id);
        res.status(200).json({message: 'User mark as ready successfully', idUser: attendee.userId});
    } catch (error) {
        next(error);
    }
};


export default {
    createAttendee, 
    getAttendees, 
    getAttendeeById, 
    updateAttendee, 
    deleteAttendee, 
    leaveAttendeeInProgess, 
    userMarkAsReady
};