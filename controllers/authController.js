// Description: This file contains the logic for handling the user signup and login requests.
const authService = require("../services/authService");
const { createAccessTokenJWT } = require("../utils/helper");

const handleSignUp = async (req, res) => {
    try {
        const { fullName, email, password, phoneNumber } = req.body;

        const newUser = await authService.signup({
            fullName,
            email,
            password,
            phoneNumber
        });

        res.cookie('jwt', '', { maxAge: 1 });

        return res
            .status(201)
            .json({
                newUser,
                message: "User created successfully"
            });
    } catch (error) {
        return res.status(400).json({ error });
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
        const { email, password } = req.body


        const user = await authService.login({ email, password });

        if (!user.verified) {
            return res.status(400).json({ message: "Please verify your email" });
        }

        // Create JWT Token

        const access_token = createAccessTokenJWT(user._id);

        res.cookie("jwt", access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: process.env.MAX_AGE * 1000 // 1 hour
        });

        // console.log(access_token, "access token")


        // console.log(user, "controller")

        res.status(200).json({ user })



    } catch (error) {
        // console.log(error)
        res.status(400).json({ error })
    }

}

const handleLogout = (req, res) => {

    res.cookie('jwt', '', { maxAge: 1 })
    // res.clearCookie('jwt');
    res.status(200).json("User Logged out");
};

const handleForgotPassword = async (req, res) => {
    try {

        const { email } = req.body

        // console.log(email, "email")

        const token = await authService.forgotPassword(email);

        return res.status(200).json({ message: "Password reset link sent to your email", token });


    } catch (error) {
        // console.log(error)
        return res.status(400).json({ message: error.message });
    }
}


const handleResetPassword = async (req, res) => {
    try {

        

    } catch {

    }
}
module.exports = {
    handleSignUp,
    handleVerifyEmail,
    handleLogin,
    handleLogout,
    handleForgotPassword,
    handleResetPassword
};