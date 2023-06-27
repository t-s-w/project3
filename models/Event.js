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
    "segment":{
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

const productSchema = new mongoose.Schema({
    "name": String,
    "url": String,
    "type": {type: String},
    "classifications": [classificationSchema]
})

const eventSchema = new mongoose.Schema({
    "name": String,
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
    "_embedded": {
        "venues": [
            {"id": String}
        ],
        "attractions": [
            {"id": String}
        ]
    }
})

export default mongoose.model('Event',eventSchema)