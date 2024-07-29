import { Router } from "express";
import {
    createAttendee,
    getAttendees,
    getAttendeeById,
    updateAttendee,
    deleteAttendee,
    leaveAttendeeInProgess,
    userMarkAsReady
} from "../controllers/attendeeController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.post('/attendees',authMiddleware, createAttendee);
router.post('/leave',authMiddleware, leaveAttendeeInProgess);
router.get('/attendees', getAttendees);
router.get('/attendees/:id', getAttendeeById);
router.put('/attendees/:id', updateAttendee);
router.delete('/attendees/:id', deleteAttendee);
router.post('/attendeeReady', authMiddleware, userMarkAsReady);


export default router;