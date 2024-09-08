// const mongoose = require('mongoose');

// const cargoSchema = new mongoose.Schema({
//     title: String,
//     description: String,
//     weight: Number,
//     isHazardous: Boolean,
//     origin: String,
//     destination: String,
//     createdAt: { type: Date, default: Date.now, expires: 24 * 60 * 60 } // 24 hours
// });

// module.exports = mongoose.model('Cargo', cargoSchema);

const mongoose = require('mongoose');

const cargoSchema = new mongoose.Schema({
    title: String,
    description: String,
    weight: Number,
    isHazardous: Boolean,
    origin: String,
    destination: String,
    loading_meter: Number,
    distance: Number,
    estimatedPrice: Number,  // Add this line
}, { timestamps: true });

const Cargo = mongoose.model('Cargo', cargoSchema);

module.exports = Cargo;
