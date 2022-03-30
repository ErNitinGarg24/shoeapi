const mongoose = require('mongoose')

var priceSchema = new mongoose.Schema({
    mrp: {
        type: Number,
        required: true
    },
    disc: {
        type: Number,
        required: true
    },
    final: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('price', priceSchema)