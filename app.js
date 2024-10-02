const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const printPdf = require('./libs/puppeteer')
require('dotenv').config()

const {
    NODE_ENV,
    PORT
} = process.env

app.use(bodyParser.json())
app.use(express.urlencoded({extended:true}))

app.post('/',async (req,res,next)=>{
    res.header("Content-Type", "application/pdf");
    const download = await printPdf({
        url: req.query.url,
        excludedSections: req.body.excludedSections
    })
    res.send(Buffer.from(download))
})

app.listen(PORT||3003, ()=>{
    console.log(`Current environment: ${NODE_ENV}`)
    console.log(`Running on port ${PORT||3003}`)
})