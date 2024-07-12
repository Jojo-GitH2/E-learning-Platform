// Description: This file contains the logic for handling the user signup and login requests.
const authServices = require("../services/authService");

const handleSignUp = async (req, res) => {
    try {
        const { fullName, email, password, phoneNumber } =  req.body;

        const newUser = await authServices.signup({
            fullName,
            email,
            password,
            phoneNumber
        });

        return res
            .status(201)
            .json({
                newUser,
                message: "User created successfully"
            });
    } catch (error) {

        return res.status(400).json({ error});
    }
};


module.exports = { handleSignUp };