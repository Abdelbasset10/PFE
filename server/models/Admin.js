const mongoose = require('mongoose')

const adminSchema = mongoose.Schema({
    
    name:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    profilePicture:{
        type:String,
        default:""
    },
})

module.exports = mongoose.model('Admin',adminSchema)