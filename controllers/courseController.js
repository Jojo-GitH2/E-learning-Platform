
const handleAddCourse = async(req,res)=>{
    

    //Adding a course
   try{
   
    const {courseTitle, courseCode,  courseCategory ,courseDuration } =req.body

    const newCourse = newCourse ({
        courseTitle, 
        courseCode,  
        courseCategory ,
        courseDuration})
    await newCourse .save()

    return res.status(200).json({message: "Course created successfully"})


    


    //if(!courseTitle){
       // return res.status(400).json({message: "kindly enter course title"})
    //}
    //if(!courseCode){
        //return res.status(400).json({message: "kindly enter course code"})
    //}
    //if (!courseCategory){
        //return res.status(400).json({message: "kindly enter course category"})
    //}
    
   // if(!courseDuration){
        //return res.status(400).json({message: "kindly enter course category"})

      
        
    

         //return res.status(200).json
        // ({message:"Course selected successfully",
            
           

         //})}
} 
catch (error) {
    return res.status(400).json({ error });
}}


//To get all courses

const handleGetAllCourses = async(req,res)=>{
    
    try{

        const courses = await Courses.find()
         return res.status(200).json({
            message:"Successful",
            count: courses.length,
            courses
            
    })
}

    catch(error){
        return res.status(400).json({error})
    }
    
}

//To get one course

const handleGetOneCourse =async(req,res)=>{
    

try{
    const{id }= req.params
    const course= await Course.findById(id)
    return res.status(200).json
    ({message:"successful"})



}
catch(error){
    return res.status(400).json({error})

}}
    
    
    


module.exports ={
      handleAddCourse,
      handleGetAllCourses,
      handleGetOneCourse,
}