const express = require("express")
const router = express.Router()
const {
    handleSignUp,
    handleVerifyEmail,
    handleLogin,
    handleLogout
} = require("../controllers/authController")




router.post("/signup", handleSignUp)
router.get("/verify-email/:token", handleVerifyEmail)
router.post("/login", handleLogin)
router.get("/logout", handleLogout)

module.exports = router