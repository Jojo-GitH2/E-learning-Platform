const crypto = require('crypto');


// Will be appended to verification Link
const generateToken = () => {
    return crypto.randomBytes(32).toString('hex');
}

module.exports = {
    generateToken
}