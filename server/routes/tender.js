// const express = require('express');
// const router = express.Router();
// const Tender = require('../models/Tender');
// const Cargo = require('../models/Cargo');

// // Submit a tender quote for a cargo post
// router.post('/', async (req, res) => {
//     const { cargoId, companyName, quote } = req.body;
//     try {
//         const cargo = await Cargo.findById(cargoId);
//         if (!cargo) return res.status(404).json({ error: 'Cargo not found' });

//         const tender = new Tender({ cargo: cargoId, companyName, quote });
//         await tender.save();
//         res.status(201).json(tender);
//     } catch (err) {
//         res.status(400).json({ error: err.message });
//     }
// });

// // Get all tenders for a cargo post
// router.get('/:cargoId', async (req, res) => {
//     const { cargoId } = req.params;
//     try {
//         const tenders = await Tender.find({ cargo: cargoId });
//         res.json(tenders);
//     } catch (err) {
//         res.status(400).json({ error: err.message });
//     }
// });

// module.exports = router;

import express from 'express';
import Tender from '../models/Tender.js';
import Cargo from '../models/Cargo.js';

const router = express.Router();

// Submit a tender quote for a cargo post
router.post('/', async (req, res) => {
  try {
    const { cargoId, companyName, quote } = req.body;
    const cargo = await Cargo.findById(cargoId);
    if (!cargo) return res.status(404).json({ error: 'Cargo not found' });

    const tender = new Tender({ cargo: cargoId, companyName, quote });
    await tender.save();
    res.status(201).json(tender);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all tenders for a cargo post
router.get('/:cargoId', async (req, res) => {
  try {
    const { cargoId } = req.params;
    const tenders = await Tender.find({ cargo: cargoId });
    res.json(tenders);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;