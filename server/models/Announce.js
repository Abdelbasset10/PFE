const mongoose = require("mongoose");

const announceSchema = mongoose.Schema(
  {
    admin: String,
    title: String,
    description: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
      default: "",
    },createdAt : {
        type:Date,
        default: new Date()
    }
  },
  
  { timestamps: true }
);

module.exports = mongoose.model("Announce", announceSchema);
