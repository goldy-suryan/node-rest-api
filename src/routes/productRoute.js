const express = require('express');
const router = express.Router();

// Getting all products
router.get('/', (req, res) => {
    res.status(200).json({ message: 'Getting the GET product route' });
});

// Creating a product
router.post('/', (req, res) => {
    res.status(201).json({ message: 'POST product route' });
});

// Getting single product
router.get('/:productId', (req, res) => {
    const id = req.params.productId;
    res.status(200).json({ message: 'getting the one product' });
});

// Updating a product
router.patch('/:productId', (req, res) => {
    const id = req.params.productId;
    const updateOps = {};
    for(let key of Object.keys(req.body)) {
        updateOps[key] = req.body[key];
    }
    res.status(200).json({ message: 'updating the current data' });
});

// Deleting a product
router.delete('/:productId', (req, res) => {
    const id = req.params.productId;
    res.status(200).json({ message: 'product deleted successfully' });
});

module.exports = router;