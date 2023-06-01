const Announce = require('../models/Announce')

const createAnnounce = async (req,res) => {
    try {
        const {title,description} = req.body
        const newAnnounce = new Announce({
            title,description,admin:req.user.userId,createdAt: new Date().toISOString()
        })
        await newAnnounce.save()
        res.status(201).json(newAnnounce)
    } catch (error) {
        res.status(404).json({message:error.message})
    }
}

const getAllAnnounces = async (req,res) => {
    try {
        const allAnnounces = await Announce.find({})
        res.status(200).json(allAnnounces)
    } catch (error) {
        res.status(404).json({message:error.message})
    }
}

const getAdminAnnouncements = async (req,res) => {
    try {
        const {id} = req.params
        const announcements = await Announce.find({admin:id})
        res.status(200).json(announcements)
    } catch (error) {
        res.status(404).json({message:error.message})
    }
}


const updateAnnounce = async (req,res) => {
    try {
        const {id} = req.params
        const getAnnounceAndUpdate = await Announce.findByIdAndUpdate(id,{...req.body},{new:true})
        res.status(200).json(getAnnounceAndUpdate)
    } catch (error) {
        res.status(404).json({message:error.message})
    }
}

const deleteAnnounce = async (req,res) => {
    try {
        const {id} = req.params
        const getAnnounceAndDelete = await Announce.findByIdAndDelete(id)
        res.status(200).json(getAnnounceAndDelete)
    } catch (error) {
        res.status(404).json({message:error.message})
    }
}


module.exports = {createAnnounce, getAllAnnounces, getAdminAnnouncements, updateAnnounce, deleteAnnounce}