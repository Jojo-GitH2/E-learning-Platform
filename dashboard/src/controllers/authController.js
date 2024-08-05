const authService = require("../services/authService");
const { createAccessTokenJWT } = require("../utils/helper");
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const handleSignUp = async (req, res) => {
    try {
        const { fullName, email, password, phoneNumber } = req.body;
        
        // Calling the signup service to handle user creation
        const newUser = await authService.signup({ fullName, email, password, phoneNumber });
        
        res.cookie('jwt', '', { maxAge: 1 });

        return res.status(201).json({
            newUser,
            message: "User created successfully"
        });
    } catch (error) {
        console.error('Error during user registration:', error); // Log the error for debugging
        
        // Send a more descriptive error message if available
        return res.status(400).json({
            error: error.message || 'An error occurred during registration'
        });
    }
};


const handleVerifyEmail = async (req, res) => {
    try {
        const { token } = req.params;
        const user = await authService.verifyEmail(token);
        return res.status(200).json({ message: "User verified successfully", user });
    } catch (error) {
        return res.status(404).json({ error: error.message });
    }
}

const handleLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await authService.login({ email, password });
        if (!user.verified) {
            return res.status(400).json({ message: "Please verify your email" });
        }
        const access_token = createAccessTokenJWT(user._id);
        res.cookie("jwt", access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: process.env.MAX_AGE * 1000
        });
        res.status(200).json({ user });
    } catch (error) {
        res.status(400).json({ error });
    }
}

const handleLogout = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.status(200).json("User Logged out");
};

const handleForgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const token = await authService.forgotPassword(email);
        return res.status(200).json({ message: "Password reset link sent to your email", token });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

const handleResetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;
        const updatedUser = await authService.resetPassword(token, password);
        res.status(200).json({ message: "Password reset successfully", user: updatedUser });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};
const handleGoogleSignIn = async (req, res) => {
    try {
        const { token } = req.body;
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const { name, email, picture } = ticket.getPayload();
        const user = await authService.googleSignIn({ name, email, picture });
        const access_token = createAccessTokenJWT(user._id);
        res.cookie("jwt", access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: process.env.MAX_AGE * 1000
        });
        res.status(200).json({ user });
    } catch (error) {
        res.status(400).json({ error });
    }
}

const handle2FA = async (req, res) => {
    try {
        const { userId, code } = req.body;
        const valid = await authService.verify2FA(userId, code);
        if (valid) {
            const access_token = createAccessTokenJWT(userId);
            res.cookie("jwt", access_token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: process.env.MAX_AGE * 1000
            });
            res.status(200).json({ message: "2FA successful" });
        } else {
            res.status(400).json({ message: "Invalid 2FA code" });
        }
    } catch (error) {
        res.status(400).json({ error });
    }
}

module.exports = {
    handleSignUp,
    handleVerifyEmail,
    handleLogin,
    handleLogout,
    handleForgotPassword,
    handleResetPassword,
    handleGoogleSignIn,
    handle2FA
};

