import Event from '../models/Event.js';
import vars from '../config/vars.js';


async function getAll(req, res) => {
    const events = await Event.find();
    res.json(events);
}
async function refreshData(req, res) => {
    const eventData = await fetch(vars.TICKETMASTER_API).then(res => res.json())
    eventData._embedded.events.forEach(async x => {
        const y = await Event.replaceOne({ id: x.id }, x, { upsert: true })
    })
}
async function findById(req, res) => {
    const { id } = req.params;
    console.log(id);
    try {
        const event = await Event.findById(id);
        if (!event) {
            res.status(404).json({ "msg": "Requested event id not found" })
        }
        res.json(event)
    } catch {
        res.status(404).json({ "msg": "Id not found!" })
    }
}


export { getAll, refreshData, findById }