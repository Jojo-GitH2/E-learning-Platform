
const mongoose = require("mongoose");

const { isEmail } = require("validator");

const userSchema = new mongoose.Schema(
    {

        fullName: {
            type: String,
            required: [true, "Please provide your full name"],
        },

        email: {
            type: String,
            required: [true, "Please provide your email"],
            unique: true,
            lowercase: true,
            validate: [isEmail, "Please enter a valid email"]
        },

        password: {
            type: String,
            required: true,
            required: [true, 'Please enter a password'],
            minlength: [8, 'Minimum password length is 8 characters']
        },

        phoneNumber: {
            type: String,
            required: true
        },

        verified: {
            type: Boolean,
            default: false
        },

        profileCompleted: {
            type: String,
        },

        subscriptionPlan: {
            type: String,
            required: true
        },
        progressTracking: {
            type: String,
            required: true
        },
    },
    { timestamps: true })



// Mongoose hooks to hash password before saving to DB
userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const User = new mongoose.model("User", userSchema)

module.exports = User