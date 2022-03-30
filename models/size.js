const { Decimal128 } = require('mongodb')
const mongoose = require('mongoose')
const color = require('../models/color')

var sizeSchema = new mongoose.Schema({
    size: {
        type: Array,
        required: true
    },
    colors: [
        color.schema
    ],
})

module.exports = mongoose.model('size', sizeSchema)