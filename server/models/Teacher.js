const mongoose = require('mongoose')

const teacherSchema = mongoose.Schema({
    
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
    pfeType:{
        type:String,
        enum:['web','mobile','ai','cyber'],
        default:'ai'
    },
    studentsVision:[{type:mongoose.Schema.Types.ObjectId, ref:'Student'}],
    isVision:{
        type:Boolean,
        default:false
    }
})

module.exports = mongoose.model('Teacher',teacherSchema)