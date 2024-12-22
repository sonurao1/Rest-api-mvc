const mongoose = require("mongoose");


// now creating schema 
const userSchema = new mongoose.Schema({
    firstName:{
      type: String,
      required: true,
    },
    lastName: {
      type: String,
  
    },
    email:{
      type: String,
      required:true,
      unique: true, //which mean same type email can't be stroed
    },
    jobTitle:{
      type:String,
    },
    gender:{
      type: String,
      required: true,
    }
  
  },{timestamps: true})


//   now creating model
const User = mongoose.model("user" , userSchema)

module.exports = User;