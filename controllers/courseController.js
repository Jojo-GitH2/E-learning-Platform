
const Course =require("../models/Course")



const courseController =[
    {
        courseTitle: "Mathematics",
        courseCode: "mathematics 101",
        courseCategory: "simple",
        courseDuration: "six months"
    },
    
    {
        courseTitle: "English",
        courseCode: "English 101",
        courseCategory: "simple simple",
        courseDuration: "six months"

    }
]

const handleAddCourse = async(req,res)=>{

    try{

        const {courseTitle, courseCode, courseDuration, courseCategory }= req.body

        if(!courseTitle){return res.status(200).json({message:"Kindly select course title"})
        }
        
        if(!courseCode){return res.status(200).json({message:"Kindly select course code"})
        }
        if (!courseDuration){return res.status(200).json({message:"Kindly select Course duration"})
        }
        if(!courseCategory){return res.status(200).json({message:"Kindly select course category"})
        }
        
        
        const newCourse = new Course({ 
            courseTitle, 
            courseCode, 
            courseDuration, 
            courseCategory 

        })
        await newCourse.save()
        return res.status(200).json(
            {message:"Course selected successfully",
            Course: newCourse
            })

    }
   
    catch (error)
    {return res.status(400).json({error})

    }
        
    
       

}

//To get all courses

const handleGetAllCourses = async (req,res)=>{ 
   
    try{
     const course= await Course.find()

     return res.status(200).json({
        message:"successful",
        //count:course.lenght, 
        course
      
    
    })
    
    
    //(req, res)




}
    catch (error){
        return res.status(400).json({error})
    }
}

//const handleGetAllCourses = async(req,res)=>{
    
//}    //async(req,res)=>{
    
    //try{

        //const courses = await Courses.find()
         //return res.status(200).json({
            //message:"Successful",
            //count: courses.length,
            //courses
            
    //})
            //const course = await Courses.find()
            
        //return res.status(200).json({
            //message:"successfully",
            //courses
        //})
//}

    //catch(error){
        //return res.status(400).json({error})
    //}
    


//To get one course

//const handleGetOneCourse =async(req,res)=>{
    

//try{
    //const{id }= req.params
    //const course= await Course.findById(id)
    //return res.status(200).json
    //({message:"successful"})



//}
//catch(error){
    //return res.status(400).json({error})

//}}
    
    
    


module.exports ={
      handleAddCourse,
      handleGetAllCourses,
      
      
}