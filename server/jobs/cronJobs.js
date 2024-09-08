const cron = require('node-cron');
const Cargo = require('../models/Cargo');

// Every hour, check for expired cargos
cron.schedule('* * * * *', async () => {
    try {
        await Cargo.deleteMany({ createdAt: { $lt: new Date(Date.now() - 300 * 1000) } }); // Delete cargos older than 24 hours
        console.log('Expired cargos deleted');
    } catch (error) {
        console.error('Error deleting expired cargos:', error);
    }
});
