const express = require('express')
const mongoose = require('mongoose')
const url = 'mongodb://localhost/ShoeCommerceDB'

const app = express()

mongoose.connect(url, { useNewUrlParser: true })

const con = mongoose.connection

con.on('open', () => {
    console.log("Connected..")
})

app.use(express.json())

const prodRouter = require("./router/prods")

app.use('/prods', prodRouter)

app.listen(9000, () => {
    console.log("server started");
})