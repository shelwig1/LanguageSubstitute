const express = require('express')
const app = express()
const bodyParser = require('body-parser');

app.use(express.json())
app.use(bodyParser.json())

const router = require('./router')

app.use('/', router)

app.post('/', (req, res) => {
    console.log(req.body)
    res.body = "Hello!"
})

//app.listen(3000, () => console.log('Server has started'))

module.exports = app

