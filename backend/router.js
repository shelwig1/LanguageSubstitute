const translate = require('./translate')
const express = require('express')
const router = express.Router()


router.get('/', (req, res) => {
    res.json({message: "Hello from the backend, baby"})
})
 
/* router.get('/:text', async (req, res) => {
    try {
        //return translateText(text)
        console.log("Got a thing from the thing baby")
    } catch (err) {
        res.status(400).json({message : err.message})
    }
}) */


router.post('/', async (req, res) => {
    const data = req.body
    console.log("Server - data received:", data)
    const responseData = []
    console.log("Recieved a post request ", data)
    console.log(data.length)
    for (const word in data) {
        //console.log("Word: ", data[word])
        //const processedWord = data[word]
        // Uncomment this and everything should work correctly
        const processedWord = await translate.translateText(data[word])
        responseData.push(processedWord)
    }
    //res.body = JSON.stringify(responseData)
    res.json(responseData)

    res.status(200)
    //console.log("Server - response data: ", res.body)
})

//console.log(translate.translateText("Hello world"))

module.exports = router
