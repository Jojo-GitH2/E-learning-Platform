const nodemailer = require('nodemailer');
const { service, secure, auth } = require('../config/email');

const transporter = nodemailer.createTransport({
    service,
    secure,
    auth: 
    {
        user: auth.user,
        pass: auth.pass
    }
});

const sendEmail = async (to, subject, html) => {
    try {
        await transporter.sendMail({
            from: auth.user,
            to,
            subject,
            html
        });
    } catch (error) {
        console.log(error);
        throw new Error('Error sending email');
    }
}

module.exports = {
    sendEmail
};