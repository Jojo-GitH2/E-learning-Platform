const mongoose = require("mongoose");


const TokenSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    token: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ['emailVerification', 'passwordReset'],
        required: true,
    }

    // createdAt: {
    //     type: Date,
    //     default: Date.now,
    //     expires: 3600,
    // },
});

const Token = mongoose.model("Token", TokenSchema);
module.exports = Token;