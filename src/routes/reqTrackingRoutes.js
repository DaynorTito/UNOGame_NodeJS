import { Router } from "express";
import reqTrackingController from "../controllers/reqTrackingController.js";

const router = Router();

router.get('/requests', reqTrackingController.statesRequest);
router.get('/response-times', reqTrackingController.responseTime);
router.get('/status-codes', reqTrackingController.statusCodes);
router.get('/popular-endpoints', reqTrackingController.popularEndpoint);

export default router;
