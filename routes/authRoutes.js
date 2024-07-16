const express = require("express")
const router = express.Router()
const {
    handleSignUp,
    handleVerifyEmail,
    handleLogin,
    handleLogout,
    handleForgotPassword,
    handleResetPassword
} = require("../controllers/authController")




router.post("/signup", handleSignUp)
router.get("/verify-email/:token", handleVerifyEmail)
router.post("/login", handleLogin)
router.get("/logout", handleLogout)

router.post("/forgot-password", handleForgotPassword);
router.post("/reset-password/:token", handleResetPassword);

module.exports = router