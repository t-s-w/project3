import Event from '../models/Event.js';
import vars from '../config/vars.js';

const eventsCtrl = {
    getAll: async (req,res) => {
        const events = await Event.find();
        res.json(events);
    },
    refreshData: async (req,res) => {
        const eventData = await fetch(vars.TICKETMASTER_API).then(res => res.json())
        eventData._embedded.events.forEach(async x => {
            const y = await Event.replaceOne({id: x.id},x,{upsert:true})
        })
    },
    findById: async (req,res) => {
        const {id} = req.params;
        const event = await Event.find({id: id});
        res.json(event)
    }
}

export default eventsCtrl