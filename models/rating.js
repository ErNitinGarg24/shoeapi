const mongoose = require('mongoose')

var ratingSchema = new mongoose.Schema({
    rate: {
        type: Number,
        required: false
    },
    count: {
        type: Number,
        required: false
    }
})

module.exports = mongoose.model('rating', ratingSchema)