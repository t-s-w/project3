import mongoose from 'mongoose';

const receiptSchema = new mongoose.Schema({
    amountPaid: {
        type: Number,
        required: true,
    },
    physical: {
        type: Boolean
    },
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    },
    row: {
        type: String,
        required: true
    },
    startSeat: {
        type: Number,
        required: true
    },
    endSeat: {
        type: Number,
        required: true
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
})

export default mongoose.model('Receipt', receiptSchema)