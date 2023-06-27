import Event from '../models/Event.js';

const eventsCtrl = {
    getAll: async (req,res) => {
        const events = await Event.find();
        res.json(events);
    }
}

export default eventsCtrl