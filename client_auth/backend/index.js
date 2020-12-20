const http = require('http')
const express = require('express')
const mongoose = require('mongoose')

const morgan = require('morgan')
const bodyParser = require('body-parser')

const router = require('./router')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json({ type: '*/*' })) // 

mongoose.connect('mongodb://localhost:27017/clientAuthLearn', { 
    useNewUrlParser:true, 
    useCreateIndex: true, 
    useUnifiedTopology: true 
})

let dbconn = mongoose.connection
dbconn.once("open", () => {
    console.log(`connected to database`)
})

router(app)


// app.use(  )

const PORT = process.env.PORT || 3090
const server = http.createServer(app)
server.listen(PORT)
