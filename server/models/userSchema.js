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
  image: String,
  socketId: { type: String },
  contacts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] // storing contacts of previously texted users
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;