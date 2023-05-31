const  mongoose = require('mongoose') 

const notificationSchema = mongoose.Schema({
    sender:String,
    receiver:String,
    status:{
        type:String,
        enum:["pending","accepted","declined"],
        default:"pending"
    },
    type:{
        type:String,
        enum:["binome","encadreur"]
    }
})

module.exports = mongoose.model("Notification",notificationSchema)