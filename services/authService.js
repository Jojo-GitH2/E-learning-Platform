const User = require('../models/User');
const { handleAuthValidation } = require('../utils/validation');

const signup = async (userData) => {
    try {

        // Create new user
        const newUser = new User({
            fullName: userData.fullName,
            email: userData.email,
            password: userData.password,
            phoneNumber: userData.phoneNumber,
            // Other fields as needed
        });


        // Save user to database
        const savedUser = await newUser.save();

        console.log(savedUser);
        return {
            fullName: savedUser.fullName,
            email: savedUser.email,
            phoneNumber: savedUser.phoneNumber
        };
    } catch (error) {
        throw handleAuthValidation(error);
    }
};


module.exports = {
    signup
};