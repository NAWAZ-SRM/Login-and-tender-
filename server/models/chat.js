import mongoose from "mongoose";

const chatUser = new mongoose.Schema({
  username: { type: String, required: true },
  phoneno: {type:String, required:true},
  socketId: { type: String },
  contacts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] // storing contacts of previously texted users
});

// Using default export for the User model
const chat = mongoose.model('chatUser', chatUser);
export default chat;