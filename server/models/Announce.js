const mongoose = require('mongoose')

const announceSchema = mongoose.Schema({
    admin:String,
    title:String,
    description:{
        type:String,
        required:true
    },
    picture:{
        type:String,
        default:""
    },
})

module.exports = mongoose.model('Announce',announceSchema)