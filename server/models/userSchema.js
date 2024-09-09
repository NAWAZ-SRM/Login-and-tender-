// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema({
//     googleId:String,
//     displayName:String,
//     email:String,
//     image:String
// },{timestamps:true});


// const userdb = new mongoose.model("user",userSchema);

// module.exports = userdb;
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  googleId: String,
  displayName: String,
  email: String,
  image: String
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;