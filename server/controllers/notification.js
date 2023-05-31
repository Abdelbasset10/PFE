const Notification = require("../models/Notification")


const createNotification = async (req,res) => {
    try {
        const {receiver,type} = req.body
        if(!receiver || !type){
            return res.status(400).json({message:"Missing informations!"})
        }
        if(receiver === req.user.userId){
            return res.status(400).json({message:"You can't send notification to your self!"})
        }
        const newNotification = new Notification({
            sender :req.user.userId,
            receiver,
            type
        })
        await newNotification.save()
        res.status(201).json(newNotification)
    } catch (error) {
        res.status(500).json(error)
    }
}

const getUserNotifications = async (req,res) => {
    try {
        const {id} = req.params
        const notifications1 = await Notification.find({receiver:id})
        const notifications2 = await Notification.find({sender:id})
        const notifications = notifications1.concat(notifications2)
        res.status(200).json(notifications)
    } catch (error) {
        res.status(500).json(error)
    }
}

const acceptedNotification = async (req,res) => {
    try {
        const {id} = req.params
        const getNotificationAndUpdate = await Notification.findByIdAndUpdate(id,{status:'accepted'})
        res.status(200).json(getNotificationAndUpdate)
    } catch (error) {
        res.status(500).json(error)
    }
}

const declinedNotification = async (req,res) => {
    try {
        const {id} = req.params
        const getNotificationAndUpdate = await Notification.findByIdAndUpdate(id,{status:'declined'},{new:true})
        res.status(200).json(getNotificationAndUpdate)
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = {createNotification, getUserNotifications, acceptedNotification, declinedNotification}