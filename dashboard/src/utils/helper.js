const jwt = require('jsonwebtoken');

const createAccessTokenJWT = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.MAX_AGE,
    });
};

const generateToken = () => {
    return Math.floor(1000 + Math.random() * 9000).toString();
};

module.exports = {
    createAccessTokenJWT,
    generateToken,
};
