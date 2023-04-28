const mongoose = require('mongoose')

const ConverModal = mongoose.Schema({
    members:[],
},{timestamps:true})

module.exports = mongoose.model("ConverModal",ConverModal)