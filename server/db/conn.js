// const mongoose = require("mongoose");

// const DB = "mongodb+srv://sheriffnawaz641:Nawaz29042005@Cluster0.irnxg.mongodb.net/mernlogin?retryWrites=true&w=majority";

// mongoose.connect(DB,{
//     useUnifiedTopology:true,
//     useNewUrlParser:true,
// }).then(()=>console.log("database connected")).catch((err)=>console.log("errr",err))

// const mongoose = require('mongoose');
// const dotenv = require('dotenv');

// dotenv.config();

// const connectDB = async () => {
//     try {
//         await mongoose.connect(process.env.MONGO_URI, {
//             // no need to specify useNewUrlParser and useUnifiedTopology
//         });
//         console.log('MongoDB connected');
//     } catch (err) {
//         console.error('MongoDB connection error:', err);
//         process.exit(1);
//     }
// };

// module.exports = connectDB;

import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      // no need to specify useNewUrlParser and useUnifiedTopology
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

export default connectDB;