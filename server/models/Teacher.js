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
    },
    lvl:{
        type:String,
        enum:["L3","M2"]
    },
    studentsVision:[{type:mongoose.Schema.Types.ObjectId, ref:'Student'}],
    isVision:{
        type:Boolean,
        default:false
    }
},{timestamp:true})

module.exports = mongoose.model('Teacher',teacherSchema)