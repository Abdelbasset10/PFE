const Admin = require('../models/Admin')
const Announce = require('../models/Announce')
const jwt = require('jsonwebtoken')


const getAllAdmins = async (req,res) => {
    try {
        const admins = await Admin.find({})
        res.status(200).json(admins)
    } catch (error) {
        res.status(404).json({message:error.message})
    }
}

const getAdmin = async (req,res) => {
    try {
        const {id} = req.params
        const admin = await Admin.findById(id)
        res.status(200).json(admin)
    } catch (error) {
        res.status(404).json({message:error.message})
    }
}


const updateAdmin = async (req,res) => {
    try {
        const {id} = req.params
        const getAdminAndUpdate = await Admin.findByIdAndUpdate(id,{...req.body},{new:true})
        const token = jwt.sign({userId:getAdminAndUpdate._id,userName:getAdminAndUpdate.name,userType:'admin'},'JWT_SECRET',{expiresIn:'1d'})
        return res.status(200).json({token,user:getAdminAndUpdate})
    } catch (error) {
        res.status(404).json({message:error.message})
    }
}

const deleteAdmin = async (req,res) => {
    try {
        const {id} = req.params
        const getAdminAndDelete = await Admin.findByIdAndDelete(id)
        res.status(200).json(getAdminAndDelete)
    } catch (error) {
        res.status(404).json({message:error.message})
    }
}

module.exports = {getAllAdmins, getAdmin, updateAdmin, deleteAdmin}