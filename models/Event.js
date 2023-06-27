import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
    "name": String,
    "id": String
})

export default mongoose.model('Event',eventSchema)