import express from 'express';
import eventsCtrl from '../controllers/events.js';


const router = express.Router();

router.get('/',(req,res) => {
    res.json(JSON.stringify(eventsCtrl.getAll()));
});

export default router