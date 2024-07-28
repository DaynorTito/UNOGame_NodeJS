import { Router } from "express";
import {
    createAttendee,
    getAttendees,
    getAttendeeById,
    updateAttendee,
    deleteAttendee
} from "../controllers/attendeeController.js";

const router = Router();

router.post('/attendees', createAttendee);
router.get('/attendees', getAttendees);
router.get('/attendees/:id', getAttendeeById);
router.put('/attendees/:id', updateAttendee);
router.delete('/attendees/:id', deleteAttendee);


export default router;