import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
    "ratio": String,
    "url": String,
    "width": Number,
    "height": Number,
    "fallback": Boolean
})

const classificationSchema = new mongoose.Schema({
    "primary": Boolean,
    "segment": {
        "name": String
    },
    "genre": {
        "name": String
    },
    "subGenre": {
        "name": String
    },
    "type": {
        type: Object,
        "name": String
    },
    "subType": {
        "name": String
    },
    "family": Boolean

})

const venueSchema = new mongoose.Schema({
    "name": String,
    "id": String,
    "images": [imageSchema],
    "postalCode": String,
    "timezone": String,
    "city": { "name": String },
    "state": { "name": String, "stateCode": String }
})

const venueConfigSchema = new mongoose.Schema({
    prices: {
        type: [Number],
        required: true,
        validate: [(val) => val.length >= 4, "Must have minimum 4 prices"]
    },
    seats: {
        type: [{
            row: String,
            count: Number,
            grade: Number
        }],
        required: true
    }
})

const productSchema = new mongoose.Schema({
    "name": String,
    "url": String,
    "type": { type: String },
    "classifications": [classificationSchema]
})

const eventSchema = new mongoose.Schema({
    "name": String,
    "seatConfig": venueConfigSchema,
    "id": {
        type: String, require: true, unique: true
    },
    "url": String,
    "locale": String,
    "images": [imageSchema],
    "sales": {
        "public": {
            "startDateTime": Date,
            "endDateTime": Date,
            "startTBD": Boolean,
            "startTBA": Boolean
        }
    },
    "dates": {
        "start": {
            "dateTime": Date,
            "dateTDB": Boolean,
            "dateTBA": Boolean,
            "timeTBA": Boolean,
            "noSpecificTime": Boolean
        },
        "timezone": String,
        "status": {
            "code": String
        },
        "spanMultipleDays": Boolean
    },
    "classifications": [classificationSchema],
    "pleaseNote": String,
    "priceRanges": [
        {
            "currency": String,
            "min": Number,
            "max": Number
        }
    ],
    "products": [productSchema],
    "ageRestrictions": {
        "legalAgeEnforced": Boolean
    },
    "ticketLimit": {
        "info": String
    },
    "_embedded": {
        "venues": [venueSchema],
        "attractions": [
            { "id": String }
        ]
    }
})

export default mongoose.model('Event', eventSchema)