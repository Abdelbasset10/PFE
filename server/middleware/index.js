const jwt = require('jsonwebtoken')

const Student = require('../models/Student')
const Teacher = require('../models/Teacher')
const Admin = require('../models/Admin')

const isStudent = async (req,res,next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        if(!token){
            return res.status(401).json({message:"UnAuthorized ! You are not signed in !!"})
        }
        const payload = jwt.verify(token,'JWT_SECRET')
        const isExist = await Student.findById(payload.userId) || await Teacher.findById(payload.userId) || await Admin.findById(payload.userId)
        if(!isExist) {
            return res.status(404).json({message:"You are not this User !!"})
        }
        req.user = payload
        next() 
    } catch (error) {
        
    }
}

const isTeacher = async (req,res,next) => {
    try {
        isStudent(req,res,()=>{
            if(req.user.userType !=="teacher"){
                return res.status(401).json({message:"You are not Teacher to do this !!"})  
            }else{
                next()
            }
        })
    } catch (error) {     
    }
}

const isAdmin = async (req,res,next) => {
    try {
        isStudent(req,res,()=>{
            if(req.user.userType ==="admin"){
                next()
            }else{
                return res.status(401).json({message:"You are not Admin to do this !!"})
            }
        })
    } catch (error) {
        
    }
}


module.exports = {isStudent, isTeacher, isAdmin}