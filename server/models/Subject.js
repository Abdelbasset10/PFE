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
    },
    subjectType:{
        type:String,
        enum:['intern','extern']
    },
    createdAt : {
        type:Date,
        default: new Date()
    },
    isCached:{
        type:Boolean,
        default:false
    }
    },
    { timestamps: true }
)

module.exports = mongoose.model('Subject',subjectSchema)