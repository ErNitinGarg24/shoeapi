const mongoose = require('mongoose')

var colorSchema = new mongoose.Schema({
    color: {
        type: Array,
        required: true
    },
    available: {
        type: Array,
        required: true,
        default: 0
    }
})

module.exports = mongoose.model('color', colorSchema)
