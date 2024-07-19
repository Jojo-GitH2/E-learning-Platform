

const express = require("express")
const { handleAddCourse, handleGetAllCourses, handleGetOneCourse } = require("../controllers/courseController")

const courseRouter = express.Router()

courseRouter.post("/add-course",handleAddCourse)
courseRouter.get("/all-courses",handleGetAllCourses)
courseRouter.get("/one-course",handleGetOneCourse)




module.exports= courseRouter