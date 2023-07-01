import Event from '../models/Event.js';
import Receipt from '../models/Receipt.js'
import vars from '../config/vars.js';


async function getAll(req, res) {
    const events = await Event.find();
    res.json(events);
}
async function refreshData(req, res) {
    const eventData = await fetch(vars.TICKETMASTER_API).then(res => res.json())
    eventData._embedded.events.forEach(async x => {
        const y = await Event.replaceOne({ id: x.id }, x, { upsert: true })
    })
}
async function findById(req, res) {
    const { id } = req.params;
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

async function getTakenSeats(req, res) {
    try {

        const { id } = req.params;
        const eventReceipts = await Receipt.find({ eventId: id });
        const returnArr = []
        for (let receipt of eventReceipts) {
            for (let i = receipt.startSeat; i <= receipt.endSeat; i++) {
                const seatNum = i < 10 ? '0' + i.toString() : i.toString()
                returnArr.push(receipt.row + seatNum)
            }
        }
        res.json(returnArr)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}


export { getAll, refreshData, findById, getTakenSeats }