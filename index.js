
const express = require("express")
const dotenv = require("dotenv").config()
const connectDB= require("./db/dbFile")







//const mongoose= require("mongoose")




const app = express()

const PORT = process.env.PORT || 8000

//function to connect to DB

connectDB()

//mongoose.connect(process.env.MONGODB_URL)
//.then (()=>{
    //console.log("mongodb connected");
//})
//.catch((error)=>{
    //console.log("error");
//})


app.listen(PORT, ()=>(
    console.log(`Server running on ${PORT}`)
))

app.get ("/", (req,res)=>{
    return res.status(200).json({message: "Welcome to my school E-learning Platfor"})
})

app