const Subject = require('../models/Subject')
const Teacher = require('../models/Teacher')

const createSubject = async (req,res) => {
    try {
        const {title,description,subjectField,pfeLvl} = req.body
        const newSubject = new Subject({
            title,description,subjectField,pfeLvl,teacher:req.user.userId
        })
        await newSubject.save()
        res.status(201).json(newSubject)
    } catch (error) {
        res.status(404).json({message:error.message})
    }
}

const getAllSubjects = async (req,res) => {
    try {
        const allSubjects = await Subject.find({})
        res.status(200).json(allSubjects)
    } catch (error) {
        res.status(404).json({message:error.message})
    }
}

const getTeacherSubjects = async (req,res) => {
    try {
        const {id} = req.params
        const subjects = await Subject.find({teacher:id})
        res.status(200).json(subjects)
    } catch (error) {
        res.status(404).json({message:error.message})
    }
}

const updateSubject = async (req,res) => {
    try {
        const {id} = req.params
        const getSubjectAndUpdate = await Subject.findByIdAndUpdate(id,{...req.body},{new:true})
        res.status(200).json(getSubjectAndUpdate)
    } catch (error) {
        res.status(404).json({message:error.message})
    }
}

const deleteSubject = async (req,res) => {
    try {
        const {id} = req.params
        const getSubjectAndDelete = await Subject.findByIdAndDelete(id)
        res.status(200).json(getSubjectAndDelete)
    } catch (error) {
        res.status(404).json({message:error.message})
    }
}

const getSubjectByField = async (req,res) => {
    try {
        const {field} = req.query
        const result = new RegExp(field,"i")
        const subjects = await Subject.find({subjectField:result})
        res.status(200).json(subjects)
    } catch (error) {
        res.status(404).json({message:error.message})
    }
}

const filterSubjects = async (req,res) => {
    try {
        const {filtredSubjects} = req.body;
        console.log(req.body)
        const getSubjects = await Promise.all(filtredSubjects.map(async (element)=>{
            const subject = await Subject.find({subjectField:element})
            return subject
        }))
        res.json(getSubjects)
    } catch (error) {
        res.status(404).json({message:error.message})
    }
}

module.exports = {createSubject, getAllSubjects, getTeacherSubjects, updateSubject, deleteSubject, getSubjectByField, filterSubjects}