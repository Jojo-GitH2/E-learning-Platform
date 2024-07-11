
const Users= require("../model/usersModel")

const handleAddUser= async (req,res)=>{

    const {fullName,email,password,phoneNumber}=req.body

    const newUser = new Users({fullName,email,password,phoneNumber})

    await newUser.save()

    return res.status(200).json({message: "User Created successful"})
}