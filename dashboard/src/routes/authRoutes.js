const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const validate = require('../middleware/validate');
const authController = require('../controllers/authController');

// Route for user registration
router.post(
    '/register', validate, authController.handleSignUp);
    
// Other authentication routes
router.post('/login', authController.handleLogin);
router.post('/logout', authController.handleLogout);
router.post('/forgot-password', authController.handleForgotPassword);
router.post('/reset-password/:token', authController.handleResetPassword);
router.post('/google-signin', authController.handleGoogleSignIn);
router.post('/verify-email/:token', authController.handleVerifyEmail);
router.post('/2fa', authController.handle2FA);

module.exports = router;
