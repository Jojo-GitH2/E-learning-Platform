const User = require('../models/User');
const { handleAuthValidation } = require('../utils/validation');
const helper = require('../utils/helper');
const Token = require('../models/Token');
const fs = require('fs');
const { sendEmail } = require('../services/emailService');

const signup = async (userData) => {
    try {

        // Check if email already exists
        const userExists = await User.findOne({

            email: userData.email
        });



        if (userExists) {
            throw new Error(
                "11000"
            )
        };


        // Create new user
        const newUser = new User({
            fullName: userData.fullName,
            email: userData.email,
            password: userData.password,
            phoneNumber: userData.phoneNumber,
        });


        // Save user to database
        const savedUser = await newUser.save();

        // Generate Verification Token

        const token = new Token({
            userId: savedUser._id,
            token: helper.generateToken()
        });

        await token.save();


        // Send verification email

        const verificationLink = `${process.env.BASE_URL}/api/v1/users/verify-email/${token.token}`
        const emailTemplate = fs.readFileSync('./templates/verifyEmail.html', 'utf-8');
        let emailContent = emailTemplate.replace('{{verificationLink}}', verificationLink);
        emailContent = emailContent.replace('{{fullName}}', savedUser.fullName);


        await sendEmail(savedUser.email, 'Kindly verify your email', emailContent)

        // console.log(savedUser);
        return {
            fullName: savedUser.fullName,
            email: savedUser.email,
            phoneNumber: savedUser.phoneNumber
        };
    } catch (error) {
        throw handleAuthValidation(error);
    }
};


const verifyEmail = async (token) => {
    try {
        const tokenExists = await Token.findOne({
            token
        });

        if (!tokenExists) {
            throw new Error('Invalid verification link');
        }

        const user = await User.findOneAndUpdate(
            {
                _id:
                    tokenExists.userId
            },
            {
                $set:
                    { verified: true }
            });

        if (!user) {
            throw new Error('User not found');
        }

        // user.verified = true;
        // await user.save();

        await Token.findByIdAndDelete(tokenExists._id);

        return user;

    } catch (error) {
        // console.log(error);
        throw error;
    }
}

const login = async (userData) => {
    try {
        const { email, password } = userData;

        // console.log(email, password, "Service") 

        // Call Static Method on User model

        const user = await User.login(email, password);

        // console.log(user, "service")

        return user


    }
    catch (error) {
        throw handleAuthValidation(error);
    }

}

module.exports = {
    signup,
    verifyEmail,
    login
};