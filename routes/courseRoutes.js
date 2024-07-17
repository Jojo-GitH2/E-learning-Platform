

const express = require("express")
const { handleAddCourse } = require("../controllers/courseController")

const courseRouter = express.Router()

courseRouter.post("/add-course",handleAddCourse)




module.exports= courseRouter