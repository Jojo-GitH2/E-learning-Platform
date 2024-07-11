const express = require("express")
const router = express.Router()
const { handleSignUp } = require("../controllers/authController")




router.post("/signup", handleSignUp)


module.exports = router