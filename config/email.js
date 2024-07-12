module.exports = {
    service: process.env.EMAIL_SERVICE,
    secure: true, 
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
}