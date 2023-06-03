const Student = require('../models/Student')
const Teacher = require('../models/Teacher')
const Admin = require('../models/Admin')

const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')


const signUp = async (req,res) => {
    try {
        const {userType} = req.body
        if(userType === "student") {
                const {name, email, password, confirmPassword, section,lvl,type } = req.body
                if(!name || !email || !password || !confirmPassword || !section || !lvl ){
                    return res.status(400).json({message:"You have to fill all your informations !"})
                }
                const isExistEmail = await Student.findOne({email:email}) || await Teacher.findOne({email}) || await Admin.findOne({email})
                console.log(isExistEmail)
                if(isExistEmail) {
                    return res.status(400).json({message:"This Email is Already exists !"})
                }
                if(password !== confirmPassword) {
                    return res.status(400).json({message:"The passwords are incorrect !"})
                }
                const hashPassword = await bcrypt.hash(password,12)
                const newStudent = new Student({
                    name,email,password:hashPassword,section,lvl,type:"student"
                })
                await newStudent.save()
                const token = jwt.sign({userId:newStudent._id,userName:newStudent.name,userType:'student'},'JWT_SECRET',{expiresIn:'1d'})
                return res.cookie('token',token).status(201).json({token,user:newStudent})
        }else if(userType === "teacher") {
                const {name, email, confirmPassword, password, zone} = req.body
                if(!name || !email || !password || !confirmPassword || !zone ){
                    return res.status(400).json({message:"You have to fill all your informations !"})
                }
                const isExistEmail = await Student.findOne({email:email}) || await Teacher.findOne({email}) || await Admin.findOne({email})
                if(isExistEmail) {
                    return res.status(400).json({message:"This Email is Already exists !"})
                }
                if(password !== confirmPassword) {
                    return res.status(400).json({message:"The passwords are incorrect !"})
                }
                const hashPassword = await bcrypt.hash(password,12)
                const newTeacher = new Teacher({
                    name,email,password:hashPassword,type:"teacher",zone
                })
                await newTeacher.save()
                const token = jwt.sign({userId:newTeacher._id,userName:newTeacher.name,zone:newTeacher.zone,userType:'teacher'},'JWT_SECRET',{expiresIn:'1d'})
                return res.cookie('token',token).status(201).json({token,user:newTeacher})
        }else if(userType === "admin") {
                const {name, email, confirmPassword, password} = req.body
                if(!name || !email || !password || !confirmPassword ){
                    return res.status(400).json({message:"You have to fill all your informations !"})
                }
                const isExistEmail = await Student.findOne({email:email}) || await Teacher.findOne({email}) || await Admin.findOne({email})
                console.log(isExistEmail)
                if(isExistEmail) {
                    return res.status(400).json({message:"This Email is Already exists !"})
                }
                if(password !== confirmPassword) {
                    return res.status(400).json({message:"The passwords are incorrect !"})
                }
                const hashPassword = await bcrypt.hash(password,12)
                const newAdmin = new Admin({
                    name,email,password:hashPassword,type:"admin"
                })
                await newAdmin.save()
                const token = jwt.sign({userId:newAdmin._id,userName:newAdmin.name,userType:'admin'},'JWT_SECRET',{expiresIn:'1d'})
                return res.cookie('token',token).status(201).json({token,user:newAdmin})
        } else{
                return res.status(404).json({message:"you have to select your Role..."})
        }
    } catch (error) {
        res.status(404).json({message:error.message})
    }
}

const signIn = async (req,res) => {
    try {
        const {userType} = req.body
        if(userType === "student"){
                const {email, password} = req.body
                if(!email || !password) {
                    return res.status(400).json({message:"You have to fill all your informations !"})
                }
                const isExistStudent = await Student.findOne({email})
                if(!isExistStudent){
                    return res.status(404).json({message:"This Student does not exist !"})
                }
                const isValidPassword = await bcrypt.compare(password,isExistStudent.password)
                if(!isValidPassword){
                    return res.status(400).json({message:"The password is incorrect !"})
                }
                const token = jwt.sign({userId:isExistStudent._id,userName:isExistStudent.name,userType:'student'},'JWT_SECRET',{expiresIn:'1d'})
                return res.cookie('token',token).status(201).json({token,user:isExistStudent})
        }else if(userType === "teacher"){
                const {email, password} = req.body
                if(!email || !password) {
                    return res.status(400).json({message:"You have to fill all your informations !"})
                }
                const isExistTeacher = await Teacher.findOne({email})
                if(!isExistTeacher){
                    return res.status(404).json({message:"This Teacher does not exist !"})
                }
                const isValidPassword = await bcrypt.compare(password,isExistTeacher.password)
                if(!isValidPassword){
                    return res.status(400).json({message:"The password is incorrect !"})
                }
                const token = jwt.sign({userId:isExistTeacher._id,userName:isExistTeacher.name,zone:isExistTeacher.zone, userType:'teacher'},'JWT_SECRET',{expiresIn:'1d'})
                return res.cookie('token',token).status(201).json({token,user:isExistTeacher})
        }else if(userType === "admin"){
                const {email, password} = req.body
                if(!email || !password) {
                    return res.status(400).json({message:"You have to fill all your informations !"})
                }
                const isExistAdmin = await Admin.findOne({email})
                if(!isExistAdmin){
                    return res.status(404).json({message:"This Admin does not exist !"})
                }
                const isValidPassword = await bcrypt.compare(password,isExistAdmin.password)
                if(!isValidPassword){
                    return res.status(400).json({message:"The password is incorrect !"})
                }
                const token = jwt.sign({userId:isExistAdmin._id,userName:isExistAdmin.name,userType:'admin'},'JWT_SECRET',{expiresIn:'1d'})
                return res.cookie('token',token).status(201).json({token,user:isExistAdmin})
        }else{
                return res.status(404).json({message:"You have to select your Role !"})
        }
    } catch (error) {
        res.status(404).json({message:error.message})
    }
}

module.exports = {signUp, signIn}