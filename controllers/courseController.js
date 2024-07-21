
const Course = require("../models/Course")
const { handleForgotPassword, handleResetPassword } = require("./authController")



const coursetracker =[

    {
     courseTitle: "English",
     courseCode: "course 101",
     courseCategory: "category 1",
     courseDuration: "thirty min"
    },
 
    {courseTitle: "English",
     courseCode: "course 101",
     courseCategory: "category 1",
     courseDuration: "thirty min"
    }

]
  

//Adding a course


const handleAddCourse = async(req,res)=>{

   

   
   try{



   
    const {courseTitle,courseCode,courseCategory,courseDuration } =req.body

    
    if(!courseTitle){
        return res.status(400).json({message: "kindly enter course title"})
    }
    if(!courseCode){
        return res.status(400).json({message: "kindly enter course code"})
    }
    if (!courseCategory){
        return res.status(400).json({message: "kindly enter course category"})
    }
    
    if(!courseDuration){
        return res.status(400).json({message: "kindly enter course category"})

    }
    const newCourse = new Course({
        courseTitle,
        courseCode,
        courseCategory,
        courseDuration })

        await newCourse.save()
      return res.status(200).json({message:"Course selected succesfully"})

    
    
} 
   catch (error) 
    {return res.status(400).json({ error });

}}



//To get all courses

const handleGetAllCourses = async(req,res)=>{
    
    try{

        const course = await Course.find()
        return res.status(200).json({
            message: "Successful",
            count: course.lenght,
            course 
        })

        

}

    catch(error){
        return res.status(400).json({error})
    }
    
}

//To get one course

const handleGetOneCourse =async(req,res)=>{
    

try{

   const {  id   }= req.params
   const course = await Course.findById(id)
    return res.status(200).json({
        message:"successful",
       course
    })



}
catch(error){
    return res.status(400).json({error})


}}

//To update courseCode
   

       
   handleUpdateCourseCode = async(req,res)=> {


   try{

    const { id } = req.params
    const { courseCode  } = req.body
    const updatedCourse = await findByIdAndUpdate(
        id,
         { courseCode  },
         {new: true},

    )

    return res.status(200).json({
        message: "Coursecode updated successful",

        course: updatedCourse 
    })
           


    }
    catch (error){
        return res.status(404).json({error})
    }

}

  
    






module.exports ={
      handleAddCourse,
      handleGetAllCourses,
      handleGetOneCourse,
    
    
    
    
      
      
      
      
}