// const mongoose = require('mongoose');

// const tenderSchema = new mongoose.Schema({
//     cargo: { type: mongoose.Schema.Types.ObjectId, ref: 'Cargo', required: true },
//     companyName: { type: String, required: true },
//     quote: { type: Number, required: true },
//     createdAt: { type: Date, default: Date.now },
// });

// module.exports = mongoose.model('Tender', tenderSchema);

import mongoose from 'mongoose';

const cargoSchema = new mongoose.Schema({
  title: String,
  description: String,
  weight: Number,
  isHazardous: Boolean,
  origin: String,
  destination: String,
  loading_meter: Number,
  distance: Number,
  estimatedPrice: Number,
}, { timestamps: true });

const Cargo = mongoose.model('Cargo', cargoSchema);

export default Cargo;