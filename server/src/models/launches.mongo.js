const mongoose = require('mongoose')

const lanuchesSchema = new mongoose.Schema({
    flightNumber: {
        type: Number,
        required: true,
    },
    mission: {
        type: String,
        required: true,
    },
    rocket: {
        type: String,
        required: true,
    },
    lauchDate: {
        type: Date,
        required: true,
    },
    target: {
        type: String,
        require: true,
    },
    customers: [String],
    upcoming: {
        type: Boolean,
        required: true,
    },
    success: {
        type: Boolean,
        required: true,
        default: true,
    },
})

module.exports = mongoose.model('Launch', lanuchesSchema)
