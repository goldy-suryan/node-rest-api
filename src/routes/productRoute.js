const express = require('express');
const router = express.Router();

const Product = require('../model/product');

// Getting all products
router.get('/', (req, res) => {
    Product.find({}, (err, products) => {
        if (err) {
            res.status(500).json({
                message: err
            });
        } else if (!products.length) {
            res.status(200).json({
                message: 'There are no products to show'
            });
        } else {
            res.status(200).json(products);
        }
    })
});

// Creating a product
router.post('/', (req, res) => {
    Product.findOne({ name: req.body.name }, (err, result) => {
        if (err) {
            res.status(500).json({
                message: err
            });
        } else if (result) {
            res.status(400).json({
                message: 'Product already exists'
            });
        } else {
            const product = new Product();
            product.name = req.body.name;
            product.price = req.body.price;

            product.save((err, result) => {
                if (err) {
                    res.status(500).json({
                        message: err
                    });
                } else {
                    res.status(201).json({
                        result, message: 'Product created successfully'
                    });
                }
            });
        }
    })
});

// Getting single product
router.get('/:productId', (req, res) => {
    const id = req.params.productId;
    Product.findById(id, (err, product) => {
        if (err) {
            res.status(500).json({
                message: err
            });
        } else if (!product) {
            res.status(404).json({
                message: 'There are no products to show'
            });
        } else {
            res.status(200).json(product);
        }
    });
});

// Updating a product
router.patch('/:productId', (req, res) => {
    const id = req.params.productId;
    const updateOps = {};
    for (let key of Object.keys(req.body)) {
        updateOps[key] = req.body[key];
    }
    Product.findByIdAndUpdate(id, updateOps, (err, updatedProduct) => {
        if (err) {
            res.status(500).json({
                message: err
            });
        } else if (!updatedProduct) {
            res.status(404).json({
                message: 'Unable to find the product to update'
            });
        } else {
            res.status(200).json({
                updatedProduct, message: 'Product updated successfully'
            });
        }
    })
});

// Deleting a product
router.delete('/:productId', (req, res) => {
    const id = req.params.productId;
    Product.findByIdAndRemove(id, (err, response) => {
        if (err) {
            res.status(200).json({
                message: err
            });
        } else if (!response) {
            res.status(404).json({
                message: 'Unable to find the product'
            });
        } else {
            res.status(200).json({
                response, message: 'Product deleted successfully'
            });
        }
    })
});

module.exports = router;