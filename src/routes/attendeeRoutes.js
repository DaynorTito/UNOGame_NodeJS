import { Router } from "express";
import attendeeController from "../controllers/attendeeController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.post('/attendees', authMiddleware, attendeeController.createAttendee);
router.post('/leave',authMiddleware, attendeeController.leaveAttendeeInProgess);
router.get('/attendees', attendeeController.getAttendees);
router.get('/attendees/:id', attendeeController.getAttendeeById);
router.put('/attendees/:id', attendeeController.updateAttendee);
router.delete('/attendees/:id', attendeeController.deleteAttendee);
router.post('/attendeeReady', authMiddleware, attendeeController.userMarkAsReady);


export default router;