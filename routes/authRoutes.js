const express = require("express")
const router = express.Router()
const { handleSignUp, handleVerifyEmail } = require("../controllers/authController")




router.post("/signup", handleSignUp)
router.get("/verify-email/:token", handleVerifyEmail)

module.exports = router