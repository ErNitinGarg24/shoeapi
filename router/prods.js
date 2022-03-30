const express = require("express");
const router = express.Router();
const Prods = require('../models/prods');
const Size = require("../models/size");

router.get('/', async (req, res) => {
    // const filters = req.query;
    // console.log(JSON.stringify(filters))
    // console.log("+++++++++++++++++++++++++++++++++")
    // console.log(filters.src)
    // console.log("+++++++++++++++++++++++++++++++++")
    // console.log(filters.rat)
    // if (filters) {
    //     console.log("Inside if")
    // }
    const limit = 20;
    const skipNo = 20;
    const count = (await Prods.find()).length;
    const pageCount = Math.ceil(count / 20);
    console.log(pageCount);
    // const pageCount = req.body.page;
    // const skip = skipNo * (pageCount - 1);
    try {
        const products = await Prods.find().limit(limit).skip(skipNo);
        // try {
        //     const products = await Prods.find();
        res.json({ pageCount, products })
    } catch (err) {
        res.send = ('Error ' + err)
    }
})

router.get('/:slug', async (req, res) => {
    try {
        const product = await Prods.findById(req.params.slug)
        res.json(product)
    } catch (err) {
        res.send = ('Error: ' + err)
    }
})

router.post('/get', async (req, res) => {
    console.log("I am in post request")
    console.log(JSON.stringify(req.body.srch))
    var bodyData = req.body;
    var arrSize = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    const limit = 20;
    const skipNo = 20;
    const pageCount = req.body.page;
    const skip = skipNo * (pageCount - 1);
    // var name = new RegExp("", 'i');
    // console.log("This is hardcoded regex converted value: " + name)
    var srch = req.body.srch;
    var titleName = srch.replace(/^"(.*)"$/, '$1');
    var title = new RegExp(titleName, 'i');
    var rating = req.body.rating;
    var under = req.body.under;
    if (!isFinite(under)) {
        console.log("inside if")
        under = Infinity;
    }
    var over = req.body.over;
    var disc = req.body.disc;
    var size = req.body.shoeSize;
    if (size == 'null') {

        try {
            console.log("I am in try")
            const count = (await Prods.find({
                $and: [
                    { title: title },
                    { 'ratings.rate': { $gte: rating } },
                    { 'price.final': { $gte: over } },
                    { 'price.final': { $lte: under } },
                    { 'price.disc': { $gte: disc } },
                    // { 'size.size': 3 }
                ]
            })).length;
            const pageCounts = Math.ceil(count / 20);
            console.log(pageCounts);
            const products = await Prods.find({
                $and: [
                    { title: title },
                    { 'ratings.rate': { $gte: rating } },
                    { 'price.final': { $gte: over } },
                    { 'price.final': { $lte: under } },
                    { 'price.disc': { $gte: disc } },
                    // { 'size.size': 3 }
                ]
            }).limit(limit).skip(skip);
            res.json({
                products: products,
                arr: arrSize,
                pageCounts: pageCounts
            });
            req.end()
        } catch (err) {
            res.send = ('Error ' + err)
        }
    } else {
        try {
            console.log("I am in else try")
            const products = await Prods.find({
                $and: [
                    { title: title },
                    { 'ratings.rate': { $gte: rating } },
                    { 'price.final': { $gte: over } },
                    { 'price.final': { $lte: under } },
                    { 'price.disc': { $gte: disc } },
                    { 'size.size': size }
                ]
            }).limit(limit).skip(skip);
            res.json({
                products: products,
                arr: arrSize,
                pageCount: pageCount
            });
            req.end()
        } catch (err) {
            res.send = ('Error ' + err)
        }
    }
    console.log("THis is rating value: " + rating)
    console.log("THis is title value: " + title)
    console.log("THis is under value: " + under)
    console.log("THis is over value: " + over)
    console.log("THis is disc value: " + disc)
    console.log("THis is size value: " + size)
    // console.log("THis is rate value: " + rate)
    // console.log("This is regex converted value: " + name1)
    // var queryArr = [];
    // var query = { title: /sd/ };
    // for (var qur in bodyData) {
    //     console.log(`${qur}: ${bodyData[qur]}`);
    //     queryArr.push({ qur: bodyData[qur] })
    // }
    // new RegExp(country, 'i')

    // try {
    //     // console.log("I am in try, and title is :")

    //     // const productCreate = await product.save()
    //     res.json(JSON.stringify(req.body.srch))
    // } catch (err) {
    //     res.send('Error' + err)
    // }
})

router.post('/', async (req, res) => {
    console.log("I am in post request")
    console.log(JSON.stringify(req.body.price))
    const product = new Prods({
        title: req.body.title,
        desc: req.body.desc,
        price: req.body.price,
        size: req.body.size,
        colors: req.body.colors,
        ratings: req.body.ratings,
        images: req.body.images
    })
    console.log(product);

    try {
        console.log("I am in try, and title is :")

        const productCreate = await product.save()
        res.json(productCreate)
    } catch (err) {
        res.send('Error' + err)
    }

    // For multiple entry comment all above and uncomment below code
    // try {
    //     const products = (await Prods.find()).length;
    //     res.json(products)
    // } catch (err) {
    //     res.send = ('Error ' + err)
    // }
})

module.exports = router;