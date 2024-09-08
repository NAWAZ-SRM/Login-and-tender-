// const express = require('express');
// const router = express.Router();
// const Cargo = require('../models/Cargo');
// const axios = require('axios');  // Import axios
// router.get('/', async (req, res) => {
//     try {
//         const cargoList = await Cargo.find(); // Fetch all cargo from the database
//         res.status(200).json(cargoList);
//     } catch (error) {
//         console.error('Error fetching cargo list:', error);
//         res.status(500).json({ message: 'Failed to fetch cargo list' });
//     }
// });
// // POST cargo (this is what creates a new cargo)
// router.post('/', async (req, res) => {
//     try {
//         const { title, description, weight, isHazardous, origin, destination,loading_meter,distance } = req.body;

//         if (!title) {
//             return res.status(400).json({ message: 'Title is required' });
//         }

//         const newCargo = new Cargo({
//             title,
//             description,
//             weight,
//             isHazardous,
//             origin,
//             destination,
//             loading_meter,
//             distance
//         });

//         // Save the cargo first
//         const savedCargo = await newCargo.save();

//         // Call the Flask API for pricing
//         // const response = await axios.post('http://127.0.0.1:5001/api/predict', {
//         //     weight,
//         //     loading_meter,
//         //     distance
//         // });

//         // // Get the estimated price from Flask API response
//         // const estimatedPrice = response.data.predictions;

//         // // Update the cargo with the estimated price
//         // savedCargo.estimatedPrice = predictions;
//         // await savedCargo.save();

//         res.status(201).json(savedCargo);
//     } catch (error) {
//         console.error('Error creating cargo:', error);
//         res.status(500).json({ message: 'Failed to create cargo' });
//     }
// });


// router.get('/:id', async (req, res) => {
//     try {
//         const cargo = await Cargo.findById(req.params.id);
//         if (!cargo) {
//             return res.status(404).json({ message: 'Cargo not found' });
//         }
//         res.json(cargo);
//     } catch (error) {
//         res.status(500).json({ message: 'Server error while fetching cargo' });
//     }
// });

// router.get('/cargo/:id/time', async (req, res) => {
//     try {
//         const cargo = await Cargo.findById(req.params.id);
//         if (!cargo) return res.status(404).json({ error: 'Cargo not found' });
        
//         const remainingTime = Math.max(0, Math.floor((new Date() - new Date(cargo.createdAt)) / 1000)); // seconds since creation
//         res.json({ remainingTime });
//     } catch (error) {
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const Cargo = require('../models/Cargo');
const axios = require('axios');  // Import axios

// GET all cargo
router.get('/', async (req, res) => {
    try {
        const cargoList = await Cargo.find(); // Fetch all cargo from the database
        res.status(200).json(cargoList);
    } catch (error) {
        console.error('Error fetching cargo list:', error);
        res.status(500).json({ message: 'Failed to fetch cargo list' });
    }
});

// POST cargo (this is what creates a new cargo)
// router.post('/', async (req, res) => {
//     try {
//         const { title, description, weight, isHazardous, origin, destination, loading_meter, distance } = req.body;

//         if (!title) {
//             return res.status(400).json({ message: 'Title is required' });
//         }

//         const newCargo = new Cargo({
//             title,
//             description,
//             weight,
//             isHazardous,
//             origin,
//             destination,
//             loading_meter,
//             distance
//         });

//         // Save the cargo first
//         const savedCargo = await newCargo.save();

//         // Call the Flask API for pricing
//         const response = await axios.post('http://127.0.0.1:5001/api/predict', {
//             weight,
//             loading_meter,
//             distance
//         });

//         // Get the estimated price from Flask API response
//         const estimatedPrice = response.data.predictions;

//         // Update the cargo with the estimated price
//         savedCargo.estimatedPrice = estimatedPrice;
//         await savedCargo.save();

//         res.status(201).json(savedCargo);
//     } catch (error) {
//         console.error('Error creating cargo:', error);
//         res.status(500).json({ message: 'Failed to create cargo' });
//     }
// });

router.post('/', async (req, res) => {
    try {
        const { title, description, weight, isHazardous, origin, destination, loading_meter, distance } = req.body;

        if (!title) {
            return res.status(400).json({ message: 'Title is required' });
        }

        const newCargo = new Cargo({
            title,
            description,
            weight,
            isHazardous,
            origin,
            destination,
            loading_meter,
            distance
        });

        // Save the cargo first
        const savedCargo = await newCargo.save();

        // Call the Flask API for pricing
        const response = await axios.post('http://127.0.0.1:5001/api/predict', {
            weight,
            loading_meter,
            distance,
            origin,
            destination
        });

        // Get the estimated price from Flask API response
        const estimatedPrice = response.data.predictions;

        // Update the cargo with the estimated price
        savedCargo.estimatedPrice = estimatedPrice;
        await savedCargo.save();

        res.status(201).json(savedCargo);
    } catch (error) {
        console.error('Error creating cargo:', error);
        res.status(500).json({ message: 'Failed to create cargo' });
    }
});
// GET cargo by ID
// router.get('/:id', async (req, res) => {
//     try {
//         const cargo = await Cargo.findById(req.params.id);
//         if (!cargo) {
//             return res.status(404).json({ message: 'Cargo not found' });
//         }
//         res.json(cargo);
//     } catch (error) {
//         res.status(500).json({ message: 'Server error while fetching cargo' });
//     }
// });

router.get('/:id', async (req, res) => {
    try {
        const cargo = await Cargo.findById(req.params.id);
        if (!cargo) {
            return res.status(404).json({ message: 'Cargo not found' });
        }
        res.json(cargo); // Ensure cargo includes estimatedPrice
    } catch (error) {
        res.status(500).json({ message: 'Server error while fetching cargo' });
    }
});

// GET time left for cargo bidding
router.get('/cargo/:id/time', async (req, res) => {
    try {
        const cargo = await Cargo.findById(req.params.id);
        if (!cargo) return res.status(404).json({ error: 'Cargo not found' });
        
        const remainingTime = Math.max(0, Math.floor((new Date() - new Date(cargo.createdAt)) / 1000)); // seconds since creation
        res.json({ remainingTime });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
