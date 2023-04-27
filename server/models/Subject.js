const mongoose = require('mongoose')

const subjectSchema = mongoose.Schema({
    teacher:String,
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    subjectField:{
        type:String,
        enum:['web','mobile','ai','cyber'],
    },
    picture:{
        type:String,
        default:""
    },
    pfeLvl:{
        type:String,
        enum:["L3","M2"]
    }
})

module.exports = mongoose.model('Subject',subjectSchema)