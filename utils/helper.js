const crypto = require('crypto');
const jwt = require('jsonwebtoken');

// Will be appended to verification Link
const generateToken = () => {
    return crypto.randomBytes(32).toString('hex');
}

const createAccessTokenJWT = (user) => {
    return jwt.sign({
        user
    },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.MAX_AGE // 1 hour
        });
}

module.exports = {
    generateToken,
    createAccessTokenJWT
}