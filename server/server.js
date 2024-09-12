const express = require('express')
const app = express()
const cors =require('cors')
require('./dbConfig/dbConfig')
const eventRouter = require('./routes/event.route')
const authRoutes = require('./routes/auth.route')
const adminRoutes = require('./routes/admin.route')

app.use(express.json())
app.use(cors())

app.use('/auth',authRoutes)
app.use('/event',eventRouter)
app.use('/admin',adminRoutes)

app.listen(8080,()=>{
    console.log("Server is Running on Port 8080");
})