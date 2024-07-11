
const mongoose = require("mongoose");

const { isEmail, isMobilePhone, isStrongPassword} = require("validator");

const bcrypt = require("bcryptjs");

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
            required: [true, 'Please enter a password'],
            // minlength: [8, 'Minimum password length is 8 characters']
            validate: [isStrongPassword, "Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character"]
        },

        phoneNumber: {
            type: String,
            required: [true, "Please provide your phone number"],
            unique: true,
            // validate: [isMobilePhone, "Please enter a valid phone number"]
            validate: {
                validator: function (value) {
                    return isMobilePhone(value, 'any', { strictMode: true });
                },
                message: "Please enter a valid phone number with country code"
            }
        },

        verified: {
            type: Boolean,
            default: false
        },

        // profileCompleted: {
        //     type: String,
        // },

        // subscriptionPlan: {
        //     type: String,
        //     required: true
        // },
        // progressTracking: {
        //     type: String,
        //     required: true
        // },
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