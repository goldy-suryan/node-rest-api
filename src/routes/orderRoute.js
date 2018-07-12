const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json({
        message: 'Getting orders'
    });
});

router.post('/', (req, res) => {
    res.status(201).json({
        message: 'order created successfully'
    });
});

router.get('/:orderId', (req, res) => {
    const id = req.params.orderId;
    res.status(200).json({
        message: 'getting an order'
    });
});

router.delete('/:orderId', (req, res) => {
    const id = req.params.orderId;
    res.status(200).json({
        message: 'order deleted successfully'
    });
});

module.exports = router;