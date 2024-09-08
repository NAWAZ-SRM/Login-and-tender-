const mongoose = require('mongoose');

const tenderSchema = new mongoose.Schema({
    cargo: { type: mongoose.Schema.Types.ObjectId, ref: 'Cargo', required: true },
    companyName: { type: String, required: true },
    quote: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Tender', tenderSchema);
