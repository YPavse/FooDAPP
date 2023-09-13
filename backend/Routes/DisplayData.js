
const express = require('express');
const router = express.Router();
const connectDB = require('../db'); 
router.post('/foodData', async (req, res) => {
    try {
        
        await connectDB();

    
        res.send([global.fooditems, global.foodcategory]);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
