import { Router } from "express";
import attendeeController from "../controllers/attendeeController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { requestTracking } from "../middlewares/requestTracking/requestTracking.js";

const router = Router();

router.post('/attendees', authMiddleware, requestTracking(attendeeController.createAttendee));
router.post('/leave',authMiddleware, requestTracking(attendeeController.leaveAttendeeInProgess));
router.get('/attendees', requestTracking(attendeeController.getAttendees));
router.get('/attendees/:id', attendeeController.getAttendeeById);
router.put('/attendees/:id', attendeeController.updateAttendee);
router.delete('/attendees/:id', attendeeController.deleteAttendee);
router.post('/attendeeReady', authMiddleware, requestTracking(attendeeController.userMarkAsReady));


export default router;