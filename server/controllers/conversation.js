const ConverModal = require('../models/Conversation')

const createConv = async (req,res) => {
    try {
        const {user1,user2} = req.body
        const getConv1 = await ConverModal.find({members:[user1,user2]})
        const getConv2 = await ConverModal.find({members:[user2,user1]})
        if((getConv1.length > 0 || getConv2.length > 0)){
            return res.status(400).json({message:"The conversation already exists!"})
        }
        const newConv = new ConverModal({
            members:[user1,user2]
        })
        await newConv.save()
        res.status(201).json(newConv)
    } catch (error) {
        res.status(404).json({message:error})
    }
}

const getUserConversations = async (req,res) => {
    try {
        const {userId} = req.params
        const conversations = await ConverModal.find({members:{$in:userId}})
        res.status(200).json(conversations)
    } catch (error) {
        res.status(404).json({message:error})
    }
}

module.exports = {createConv,getUserConversations}

