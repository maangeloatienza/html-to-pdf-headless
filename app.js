const express = require('express')
const bodyParser = require('body-parser')
const archiver = require('archiver');
const fs = require('fs');
const app = express()
const printPdf = require('./libs/puppeteer')
require('dotenv').config()

const {
    NODE_ENV,
    PORT
} = process.env

app.use(bodyParser.json())
app.use(express.urlencoded({extended:true}))
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    // res.setHeader('Access-Control-Expose-Headers', 'Content-Disposition');
    next();
});


app.get('/',async (req,res,next)=>{
    // Set up the response as a zip file
    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', 'attachment; filename=rak-downloads.zip');

    const archive = archiver('zip', {
        zlib: { level: 9 } // Sets the compression level
    });

    archive.on('error', (err) => {
        throw err;
    });

    // Pipe the archive to the response
    archive.pipe(res);
    const download = await printPdf({
        urls: (req.query.urls).split(","),
        excludedSections: req.query.excludedSections
        // urls: req.body.urls,
        // excludedSections: req.body.excludedSections
    })

    const pdf = download.pdf
    
    const responseObj = pdf.map((item)=>{
        item.title = (item.title).replaceAll(" | Documentation Center","")
        filename = (item.title).replaceAll(" ","_")
        console.log(filename)
        archive.append(Buffer.from(item.file), { name: `${filename}.pdf` });
        // return {
        //     [index] : item.toString('base64')
        // }
    })

    // res.set({ 'Content-Type': 'application/pdf', 'Content-Length': pdf.length })

    archive.finalize();
})

app.listen(PORT||3003, ()=>{
    console.log(`Current environment: ${NODE_ENV}`)
    console.log(`Running on port ${PORT||3003}`)
})