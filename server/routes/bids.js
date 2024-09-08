const express = require('express');
const router = express.Router();
const Bid = require('../models/Bid');

// POST new bid
router.post('/', async (req, res) => {
    try {
        const { cargoId, companyName, bidAmount } = req.body;

        // Create a new bid
        const bid = new Bid({ cargoId, companyName, bidAmount });
        await bid.save();

        res.status(201).json(bid);
    } catch (err) {
        console.error('Error posting bid:', err);
        res.status(400).json({ message: 'Failed to post bid' });
    }
});

// GET bids for a specific cargo
router.get('/:cargoId', async (req, res) => {
    try {
        const bids = await Bid.find({ cargoId: req.params.cargoId });
        res.status(200).json(bids);
    } catch (error) {
        console.error('Error fetching bids:', error);
        res.status(500).json({ message: 'Failed to fetch bids' });
    }
});

module.exports = router;
