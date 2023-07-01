import express from 'express';
import * as eventsCtrl from '../controllers/events.js';


const router = express.Router();

router.get('/', eventsCtrl.getAll);
router.get('/:id', eventsCtrl.findById);
router.get('/:id/takenSeats', eventsCtrl.getTakenSeats)

export default router