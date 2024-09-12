const mongoose = require('mongoose')
require('dotenv').config()

mongoose.connect(process.env.DATABASE).then(()=>{
    console.log("Database Connected");
}).catch((err)=>{
console.log("Failed to connect Database");
})