const express = require("express")
const router = express.Router()
const { handleSignUp, handleVerifyEmail, handleLogin } = require("../controllers/authController")




router.post("/signup", handleSignUp)
router.get("/verify-email/:token", handleVerifyEmail)
router.post("/login", handleLogin)

module.exports = router