const mongoose = require('mongoose')

const MessageSchema = mongoose.Schema({
    conversationId:String,
    sender:String,
    text:String
})

module.exports = mongoose.model("MessageModal",MessageSchema)