const User = require('../models/User');
const Token = require('../models/Token');
const helper = require('../utils/helper');
const { sendEmail } = require('../utils/email');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const handleSignUp = async ({ fullName, email, password, phoneNumber }) => {
    const userExists = await User.findOne({ email });
    if (userExists) throw new Error("Email already exists");

    const newUser = new User({ fullName, email, password, phoneNumber });
    const savedUser = await newUser.save();

    const token = new Token({ userId: savedUser._id, token: helper.generateToken(), type: 'emailVerification' });
    await token.save();

    const verificationLink = `${process.env.BASE_URL}/api/v1/users/verify-email/${token.token}`;
    const emailTemplate = fs.readFileSync('./templates/verifyEmail.html', 'utf-8');
    let emailContent = emailTemplate.replace('{{verificationLink}}', verificationLink);
    emailContent = emailContent.replace('{{fullName}}', savedUser.fullName);

    await sendEmail(savedUser.email, 'Kindly verify your email', emailContent);
    return { fullName: savedUser.fullName, email: savedUser.email, phoneNumber: savedUser.phoneNumber };
};

const handleVerifyEmail= async (token) => {
    const tokenExists = await Token.findOne({ token });
    if (!tokenExists) throw new Error('Invalid verification link');

    const user = await User.findOneAndUpdate({ _id: tokenExists.userId }, { verified: true });
    if (!user) throw new Error('User not found');

    await Token.findByIdAndDelete(tokenExists._id);
    return user;
};

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

const handleForgotPassword= async (email) => {
    const user = await User.findOne({ email });
    if (!user) throw new Error('User not found');

    const token = new Token({ userId: user._id, token: helper.generateToken(), type: 'resetPassword' });
    await token.save();

    const resetLink = `${process.env.BASE_URL}/api/v1/auth/reset-password/${token.token}`;
    const emailTemplate = fs.readFileSync('./templates/resetPassword.html', 'utf-8');
    let emailContent = emailTemplate.replace('{{resetLink}}', resetLink);
    emailContent = emailContent.replace('{{fullName}}', user.fullName);

    await sendEmail(user.email, 'Reset your password', emailContent);
    return token;
};

const handleResetPassword =  async (token, newPassword) => {
    try {
        // Decode the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Find the user by ID
        const user = await User.findById(decoded.id);
        if (!user) {
            throw new Error('User not found');
        }

        // Hash the new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Update the user's password
        user.password = hashedPassword;
        await user.save();

        return user;
    } catch (error) {
        throw new Error('Invalid or expired token');
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

const signup = async ({ fullName, email, password, phoneNumber }) => {
    const userExists = await User.findOne({ email });
    if (userExists) throw new Error("Email already exists");

    const newUser = new User({ fullName, email, password, phoneNumber });
    const savedUser = await newUser.save();

    const token = new Token({ userId: savedUser._id, token: helper.generateToken(), type: 'emailVerification' });
    await token.save();

    const verificationLink = `${process.env.BASE_URL}/api/v1/users/verify-email/${token.token}`;
    const emailTemplate = fs.readFileSync('./templates/verifyEmail.html', 'utf-8');
    let emailContent = emailTemplate.replace('{{verificationLink}}', verificationLink);
    emailContent = emailContent.replace('{{fullName}}', savedUser.fullName);

    await sendEmail(savedUser.email, 'Kindly verify your email', emailContent);
    return { fullName: savedUser.fullName, email: savedUser.email, phoneNumber: savedUser.phoneNumber };
};

module.exports = {
    signup,
    handleSignUp,
    handleVerifyEmail,
    handleLogin,
    handleLogout,
    handleForgotPassword,
    handleResetPassword,
    handleGoogleSignIn,
    handle2FA
};

