const mongoose = require("mongoose")

const courseSchema= new mongoose.Schema(

    {
        courseTitle: {
            type: String,
            required: [true, "please select the title"]
        },

        courseCode:{
            type: String,
            required: [true, "please select the course code"]

        },

        courseCategory:{
            type: String,
            required:[ true, "Please select the course category"]
        },

         courseDuration: {
            type: String,
            required: [true, "please select the course duration"] 
         },

         active:{
            type: Boolean,
                default: true
         }


    }



)