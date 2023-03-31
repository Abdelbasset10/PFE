const mongoose = require('mongoose')

const studentSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    type:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    lvl:{
        type:String,
        enum:["L3","M2"]
    },
    section:{
        type:String,
        required:true
    },
    profilePicture:{
        type:String,
        default:""
    },
    isBinome:{
        type:Boolean,
        default:false
    },
    hisBinome:{type:mongoose.Schema.Types.ObjectId, ref:'Student'},
    hisTeacher:[{type:mongoose.Schema.Types.ObjectId, ref:'Teacher'}],
    pfeType:{
        type:String,
        enum:['web','mobile','ai','cyber',''],
        default:'',
    },
    hisSubject:{
        title:{
            type:String,
            default:""
        },
        subjectField:{
            type:String,
            enum:['web','mobile','ai','cyber'],
            default:"web"
        },
        subjectType:{
            type:String,
            enum:['intern','extern'],
            default:'intern'
        },
        company:{
            type:String,
            default:"USTHB"
        }
    },
})

module.exports = mongoose.model('Student',studentSchema)