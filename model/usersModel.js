
const mongoose = require("mongoose")

const userSchema = new mongoose.Schema ({

    fullName: {
        type: String, require: true},

    email:{
        type: String, require: true
    },

    password:{
        type: String, require: true
    },

    phoneNumber: {
        type: String, require: true
    },

    profileCompleted:{
        type: String, require: true
    },
    
    subscriptionPlan:{
        type: String, require: true
    },
    progressTracking: {
        type: String, require: true
    },
},

    {timestamps: true})

    const Users= new mongoose.model("Users",userSchema)

    module.exports= Users