
const mongoose = require("mongoose")
const dotenv = require("dotenv").config()

const connectDB = async()=>{
    try{
        await mongoose.connect (process.env.MONGODB_URL)

        console.log("MongoDB Connected");

    } catch (error) {
        console.log(error);
        console.log("Error connecting to DB");
    }
    
    }

module.exports = connectDB

