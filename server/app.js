// require("dotenv").config();
// const express = require("express");
// const app = express();
// const cors = require("cors");
// const connectDB=require("./db/conn")
// const PORT = 5000;
// const session = require("express-session");
// const passport = require("passport");
// const OAuth2Strategy = require("passport-google-oauth2").Strategy;
// const userdb = require("./models/userSchema")
// const dotenv = require('dotenv');
// const clientid = "5529960346-gkrfgn131kp1u1havlnsn0kc8tjb7a4a.apps.googleusercontent.com"
// const clientsecret = "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"
// const cargoRoutes = require('./routes/cargo');
// const bidRoutes = require('./routes/bids');
// const cronJobs = require('./jobs/cronJobs');

// dotenv.config();
// connectDB();


// app.use(cors({
//     origin:"http://localhost:3000",
//     methods:"GET,POST,PUT,DELETE",
//     credentials:true
// }));
// app.use(express.json());

// // setup session
// app.use(session({
//     secret:"Nawaz@29042005",
//     resave:false,
//     saveUninitialized:true
// }))

// // setuppassport
// app.use(passport.initialize());
// app.use(passport.session());

// passport.use(
//     new OAuth2Strategy({
//         clientID:clientid,
//         clientSecret:clientsecret,
//         callbackURL:"http://localhost:5000/auth/google/callback",
//         scope:["profile","email"]
//     },
//     async(accessToken,refreshToken,profile,done)=>{
//         try {
//             let user = await userdb.findOne({googleId:profile.id});

//             if(!user){
//                 user = new userdb({
//                     googleId:profile.id,
//                     displayName:profile.displayName,
//                     email:profile.emails[0].value,
//                     image:profile.photos[0].value
//                 });

//                 await user.save();
//             }

//             return done(null,user)
//         } catch (error) {
//             return done(error,null)
//         }
//     }
//     )
// )

// passport.serializeUser((user,done)=>{
//     done(null,user);
// })

// passport.deserializeUser((user,done)=>{
//     done(null,user);
// });

// // initial google ouath login
// app.get("/auth/google",passport.authenticate("google",{scope:["profile","email"]}));

// app.get("/auth/google/callback",passport.authenticate("google",{
//     successRedirect:"http://localhost:3000/dashboard",
//     failureRedirect:"http://localhost:3000/login"
// }))

// app.get("/login/sucess",async(req,res)=>{

//     if(req.user){
//         res.status(200).json({message:"user Login",user:req.user})
//     }else{
//         res.status(400).json({message:"Not Authorized"})
//     }
// })

// app.get("/logout",(req,res,next)=>{
//     req.logout(function(err){
//         if(err){return next(err)}
//         res.redirect("http://localhost:3000");
//     })
// })

// app.use(express.json());

// app.use('/api/cargo', cargoRoutes);
// app.use('/api/bids', bidRoutes);

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../client/build/index.html'));
//   });
  
// app.listen(PORT,()=>{
//     console.log(`server start at port no ${PORT}`)
// })


// // app.use(cors({
// //     origin: 'http://localhost:3000', // Replace with your frontend's origin
// //     methods: ['GET', 'POST', 'PUT', 'DELETE'],
// //     credentials: true
// // }));


// // app.listen(PORT, () => {
// //     console.log(`Server running on port ${PORT}`);
// // });

import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import connectDB from './db/conn.js';
import session from 'express-session';
import passport from 'passport';
import { Strategy as OAuth2Strategy } from 'passport-google-oauth2';
import userdb from './models/userSchema.js';
import chat from './models/chat.js';
import cargoRoutes from './routes/cargo.js';
import bidRoutes from './routes/bids.js';
// import cronJobs from './jobs/cronJobs.js';
import path from 'path';
// mini imports
import http from 'http';
import { Server as socketIo } from 'socket.io';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

dotenv.config();
connectDB();

const app = express();
const PORT = 5000;
const clientid = "5529960346-gkrfgn131kp1u1havlnsn0kc8tjb7a4a.apps.googleusercontent.com";
const clientsecret = "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";
// mini consts
const server = http.createServer(app);
const io = new socketIo(server);

app.use(cors({
  origin: ["http://localhost:5000", "http://localhost:5000/chat"],
  methods: "GET,POST,PUT,DELETE",
  credentials: true
}));

app.use(express.static(path.join(path.resolve(), '../client/dist')));
app.use(express.json());

app.use(session({
  secret: "Nawaz@29042005",
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new OAuth2Strategy({
    clientID: clientid,
    clientSecret: clientsecret,
    callbackURL: "http://localhost:5000/auth/google/callback",
    scope: ["profile", "email"]
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await userdb.findOne({ googleId: profile.id });

      if (!user) {
        user = new userdb({
          googleId: profile.id,
          displayName: profile.displayName,
          email: profile.emails[0].value,
          image: profile.photos[0].value
        });

        await user.save();
      }

      return done(null, user);
    } catch (error) {
      return done(error, null);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

app.get("/auth/google/callback", passport.authenticate("google", {
  successRedirect: "http://localhost:5000/details",
  failureRedirect: "http://localhost:5000/login"
}));

app.get("/login/sucess", async (req, res) => {
  if (req.user) {
    res.status(200).json({ message: "user Login", user: req.user });
  } else {
    res.status(400).json({ message: "Not Authorized" });
  }
});

app.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) { return next(err) }
    res.redirect("http://localhost:5000");
  });
});

//mini api
app.post('/details', async (req, res) => {
  const { username, phoneno } = req.body;
  

  try {
    const cuser = await chat.findOne({ username });
    if (!cuser) {
      // return res.status(400).json({ status: 'error', message: 'Invalid credentials' });
      const newUser = new chat({ username, phoneno:phoneno });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, 'your_jwt_secret', { expiresIn: '1h' });

    res.status(200).json({ status: 'success', message: 'Login successful', token, userId: cuser._id });
    }

    const token = jwt.sign({ id: cuser._id }, 'your_jwt_secret', { expiresIn: '1h' });
    res.status(200).json({ status: 'success', message: 'Login successful', token, userId: cuser._id });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
});

// Get contacts endpoint
app.get('/contacts/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await chat.findById(userId).populate('contacts', '_id username');
    if (user) {
      res.status(200).json(user.contacts);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Search users endpoint
app.get('/search-users', async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ message: 'Query parameter is required' });
  }

  try {
    const users = await chat.find({ username: new RegExp(query, 'i') }).select('_id username');
    res.status(200).json(users);
  } catch (error) {
    console.error('Error searching users:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Socket.IO configuration
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('set username', async (userId) => {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      console.log('Invalid userId');
      return;
    }
    const user = await chat.findByIdAndUpdate(userId, { socketId: socket.id });
    if (user) {
      console.log(`${user.username} connected with socket ID: ${socket.id}`);
    }
  });

  socket.on('private message', async (msg) => {
    const { recipientId, text } = msg;
    const recipient = await chat.findById(recipientId);

    if (recipient && recipient.socketId) {
      const sender = await chat.findOne({ socketId: socket.id });

      if (sender) {
        if (!sender.contacts.includes(recipient._id)) {
          sender.contacts.push(recipient._id);
          await sender.save();
        }
        if (!recipient.contacts.includes(sender._id)) {
          recipient.contacts.push(sender._id);
          await recipient.save();
        }

        io.to(recipient.socketId).emit('chat message', {
          text,
          sender: sender.username,
        });

        console.log(`Message sent from ${sender.username} to ${recipient.username}`);
      }
    } else {
      console.log('Recipient not found or not connected');
    }
  });

  socket.on('chat message', async (msg) => {
    const user = await chat.findOne({ socketId: socket.id });
    const senderUsername = user ? user.username : 'Anonymous';
    io.emit('chat message', { text: msg.text, sender: senderUsername });
  });

  socket.on('disconnect', async () => {
    console.log('User disconnected');
    await chat.findOneAndUpdate({ socketId: socket.id }, { socketId: null });
  });
});


app.use(express.json());

app.use('/api/cargo', cargoRoutes);
app.use('/api/bids', bidRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(path.resolve(), '../client/dist/index.html'));
});



app.listen(PORT, () => {
  console.log(`Server started at port no ${PORT}`);
});


