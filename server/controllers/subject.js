const Subject = require('../models/Subject')
const Teacher = require('../models/Teacher')

const createSubject = async (req,res) => {
    try {
        const {title,description,subjectField,pfeLvl,picture} = req.body
        const newSubject = new Subject({
            title,description,subjectField,pfeLvl,picture,teacher:req.user.userId
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
        //const result = new RegExp(field,"i")
        const teachers = await Teacher.find({})
        const getTeacher = await teachers.filter((f)=>f.name.startsWith(field))
        if(getTeacher.length === 0){
            const subjects = []
            return res.status(200).json(subjects)
        }
        let subjects =[]
        const result = await Promise.all(getTeacher.map(async(g)=>{
            const data = await Subject.find({teacher:g._id})
            // if(!data){
            //     
            //     subjects = []
            // }
            if(data){
                
                data.map((d)=>{
                    subjects.push(d)
                })
                
                return data
            }
        }))
      
        // getTeacher.map(async (g)=>{
        //     const result = await Subject.find({teacher:g._id})
        //   
        //     result.map((r)=>{
        //         subjects.push(r)
        //     })
            
        // })

        //const subjects = await Subject.find({teacher:getTeacher._id})
        res.status(200).json(subjects)
    } catch (error) {
        res.status(404).json({message:error.message})
    }
}
const filterSubjects = async (req,res) => {
    try {
        const {filtredSubjects} = req.body;
    
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