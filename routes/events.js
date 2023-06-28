import express from 'express';
import eventsCtrl from '../controllers/events.js';


const router = express.Router();

router.get('/',eventsCtrl.getAll);
router.get('/:id',eventsCtrl.findById);

export default router