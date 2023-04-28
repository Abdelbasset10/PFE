const MessageModal = require('../models/Message')
const ConverModal = require('../models/Conversation')


const createMessage = async (req,res) => {
    try {
        const {conversationId, sender, text} = req.body
        const getConv = await ConverModal.findById(conversationId)
        if(!getConv){
            return res.status(404).json({message:"Coneversation does not exist !"})
        }
        const isValidSender = getConv.members.includes(sender)
        if(!isValidSender){
            return res.status(404).json({message:"This Sender does not exists in this conversation !"})
        }
        const newMessage = new MessageModal({
            conversationId, sender, text
        })
        await newMessage.save()
        res.status(201).json(newMessage)
    } catch (error) {
        res.status(404).json({message:error})
    }
}

const getMessagesConversation = async (req,res) => {
    try {
        const {conversationId} = req.params
        const getConv = await ConverModal.findById(conversationId)
        if(!getConv){
            return res.status(404).json({message:"Coneversation does not exist !"})
        }
        const messages = await MessageModal.find({conversationId})
        res.status(200).json(messages)
    } catch (error) {
        res.status(404).json({message:error})
    }
}

module.exports = {createMessage, getMessagesConversation}