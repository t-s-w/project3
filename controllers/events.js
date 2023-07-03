import Event from '../models/Event.js';
import Receipt from '../models/Receipt.js'
import vars from '../config/vars.js';
// import { events } from 'mongoose';


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

async function getAllCategories(req, res) {
    try {
    const categories  = await Event.distinct('classifications.segment.name');
    let eventsByCategory = {};
    
    for (const category of categories) {
      const events = await Event.find({ 'classifications.segment.name': category });
      eventsByCategory[category] = events;
    }

    res.json(eventsByCategory);
    } catch (error) {
    res.status(500).json({ message: 'Error retrieving events' });
  }
}

async function findBySearch(req,res) { 
    const { searchResults } = req.params;

    try {
        const events = await Event.find({"name": {"$regex": searchResults, "$options": "i"}})
        if (events.length === 0) {
            res.status(404).json({ "msg": "No search results found" })
        }
        else {
        res.json(events)
        }
    } catch (error)
    {
        res.status(500).json({ message: 'Error retrieving events' });
    }
}
export { getAll, refreshData, findById, getTakenSeats, getAllCategories, findBySearch }