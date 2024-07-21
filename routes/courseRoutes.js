

const express = require("express")
const { handleAddCourse, handleGetAllCourses} = require("../controllers/courseController")

const courseRouter = express.Router()

courseRouter.post("/add-course",handleAddCourse)
courseRouter.get ("all-courses", handleGetAllCourses)
courseRouter




module.exports= courseRouter