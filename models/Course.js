const mongoose = require("mongoose")

const CourseSchema= new mongoose.Schema(

    {
        title: {
            type: String,
            required: [true, "please select your chosen course"]
        },

        duration:{
            type: String,
            required:[ true, "Please provide the course duration"]
        },

         description: {
            type: String,
            required: [true, "please provide the course description"] 
         },

         active:{
            type: {Boolean,default: true}
         }


    }



)