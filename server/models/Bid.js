// const mongoose = require('mongoose');

// const bidSchema = new mongoose.Schema({
//     cargoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cargo', required: true },
//     companyName: { type: String, required: true },
//     bidAmount: { type: Number, required: true },
//     bidDate: { type: Date, default: Date.now },
// });

// module.exports = mongoose.model('Bid', bidSchema);

import mongoose from 'mongoose';

const bidSchema = new mongoose.Schema({
  cargoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cargo', required: true },
  companyName: { type: String, required: true },
  bidAmount: { type: Number, required: true },
  bidDate: { type: Date, default: Date.now },
});

export default mongoose.model('Bid', bidSchema);