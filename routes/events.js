import express from 'express';
// import eventsCtrl from '../controllers/events.js';


const router = express.Router();

router.get('/',(req,res) => {
    console.log('routed')
    res.json(JSON.stringify({'msg':'events'}));
});

export default router