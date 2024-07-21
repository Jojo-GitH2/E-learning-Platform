

const express = require("express")
const { handleAddCourse, handleGetAllCourses} = require("../controllers/courseController")

const courseRouter = express.Router()

courseRouter.post("/add-course",handleAddCourse)
<<<<<<< HEAD
courseRouter.get("/all-courses",handleGetAllCourses)
courseRouter.get("/one-course/:id",handleGetOneCourse)
=======
courseRouter.get ("all-courses", handleGetAllCourses)
courseRouter
>>>>>>> 4ecba3a8d65a3de1a6169b8fee52d6b6e3d253ae




module.exports= courseRouter