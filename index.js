require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const router = require('./routes/index.router')
const app = express()

app.use(cors({
    credentials: true,
    origin: '*'
    } 
))
app.use(express.json())
app.use(router)

const PORT = process.env.PORT || 5000
const DBURL = process.env.DBURL

app.listen(PORT, async () => {
   try {
       await mongoose.connect(DBURL)
       console.log("Server started on port", PORT)
   } catch (e) {
       console.log(e)
   }
})