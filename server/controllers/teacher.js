const Teacher = require('../models/Teacher')
const jwt = require('jsonwebtoken')


const getTeacher = async (req,res) => {
    try {
        const {id} = req.params
        const teacher = await Teacher.findById(id)
        res.status(200).json(teacher)
    } catch (error) {
        res.status(404).json({message:error.message})
    }
}


const updateTeacher = async (req,res) => {
    try {
        const {id} = req.params
        const getTeacherAndUpdate = await Teacher.findByIdAndUpdate(id,{...req.body},{new:true})
        const token = jwt.sign({userId:getTeacherAndUpdate._id,userName:getTeacherAndUpdate.name,userType:'teacher'},'JWT_SECRET',{expiresIn:'1d'})
        return res.status(200).json({token,user:getTeacherAndUpdate})
    } catch (error) {
        res.status(404).json({message:error.message})
    }
}

const getAllTeachers = async (req,res) => {
    try {
        const allTeachers = await Teacher.find({})
        res.status(200).json(allTeachers)
    } catch (error) {
        res.status(404).json({message:error.message})
    }
}

const getEncadreurs = async (req,res) => {
    try {
        const allTeachers = await Teacher.find({isVision:true})
        res.status(200).json(allTeachers)
    } catch (error) {
        res.status(404).json({message:error.message})
    }
}

const deleteTeacher = async (req,res) => {
    try {
        const {id} = req.params
        const getTeacherAndDelete = await Teacher.findByIdAndDelete(id)
        res.status(200).json(getTeacherAndDelete)
    } catch (error) {
        res.status(404).json({message:error.message})
    }
}


const searchTeacher = async (req,res) => {
    try {
        const {name} = req.query
        const result = new RegExp(name,"i")
        const teachers = await Teacher.find({name:result})
        res.status(200).json(teachers)
    } catch (error) {
        res.status(404).json({message:error.message})
    }
}

const getTeachersByField = async (req,res) => {
    try {
        const {field} = req.query
        const result = new RegExp(field,"i")
        const teachers = await Teacher.find({subjectField:result})
        res.status(200).json(teachers)
    } catch (error) {
        res.status(404).json({message:error.message})
    }
}

const beVision = async (req,res) => {
    try {
        const {id} = req.params
        const teacher = await Teacher.findById(id)
        if(teacher.isVision){
            return res.status(400).json({message:"You are already visioned"})
        }
        await teacher.updateOne({isVision:true})
        const updatedTeacher = await Teacher.findById(teacher._id)
        const token = jwt.sign({userId:updatedTeacher._id,userName:updatedTeacher.name,userType:'teacher'},'JWT_SECRET',{expiresIn:'1d'})
        return res.status(200).json({token,user:updatedTeacher})
    } catch (error) {
        res.status(404).json({message:error.message})
    }
}

const beNoVision = async (req,res) => {
    try {
        const {id} = req.params
        const teacher = await Teacher.findById(id)
        if(!teacher.isVision){
            return res.status(400).json({message:"You are already not visioned"})
        }
        await teacher.updateOne({isVision:false})
        const updatedTeacher = await Teacher.findById(teacher._id)
        const token = jwt.sign({userId:updatedTeacher._id,userName:updatedTeacher.name,userType:'teacher'},'JWT_SECRET',{expiresIn:'1d'})
        return res.status(200).json({token,user:updatedTeacher})
    } catch (error) {
        res.status(404).json({message:error.message})
    }
}


module.exports = {getTeacher, getAllTeachers, getEncadreurs, updateTeacher, deleteTeacher, searchTeacher, getTeachersByField, beVision, beNoVision}