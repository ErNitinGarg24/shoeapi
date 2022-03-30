const mongoose = require('mongoose');
const price = require('../models/price');
const size = require('../models/size');
const rating = require('../models/rating');

const prodsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: false
    },
    price: [
        price.schema
    ],
    size: [
        size.schema
    ],
    ratings: [
        rating.schema
    ],
    images: {
        type: Array,
        required: true
    }

})

module.exports = mongoose.model('prods', prodsSchema)