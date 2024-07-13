// Description: This file contains the logic for handling the user signup and login requests.
const authService = require("../services/authService");

const handleSignUp = async (req, res) => {
    try {
        const { fullName, email, password, phoneNumber } =  req.body;

        const newUser = await authService.signup({
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

const handleVerifyEmail = async (req, res) => {
    try {
        const { token } = req.params;

        // console.log(token);
        
        const user = await authService.verifyEmail(token);
        return res.status(200).json({ message: "User verified successfully", user });
    
    } catch (error) {
        // console.log(error.message);
        return res.status(404).json({ error: error.message });
    }
}


// Handle login
const handleLogin = async (req, res) => {
    try {
        
    } catch (error) {
        
    }

}   

module.exports = {
    handleSignUp, 
    handleVerifyEmail
 };