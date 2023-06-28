import express from 'express';
import eventsCtrl from '../controllers/events.js';


const router = express.Router();

router.get('/',eventsCtrl.getAll);

export default router