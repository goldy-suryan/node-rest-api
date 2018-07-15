const express = require('express');
const router = express.Router();
const multer = require('multer');
const Product = require('../model/product');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const fileFilter = (req, file, cb) => { // function to store particular type of files passed to the upload variable
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(new Error('Can only upload jpg or png files'), false);
    }
}
const upload = multer({
    storage,
    limits: {
        fileSize: 1024 * 1024 * 5  // stores upto 5Mb
    },
    fileFilter
});

// Getting all products
router.get('/', (req, res) => {
    Product.find({}, '-__v', (err, products) => {
        if (err) {
            res.status(500).json({
                error: err
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
router.post('/', upload.single('productImage'), (req, res) => {
    Product.findOne({ name: req.body.name }, (err, result) => {
        if (err) {
            res.status(500).json({
                error: err
            });
        } else if (result) {
            res.status(409).json({
                message: 'Product already exists'
            });
        } else {
            const product = new Product();
            product.name = req.body.name;
            product.price = req.body.price;
            if (req.file && req.file.path) {
                // console.log(req.file); gives the access to the file object
                product.productImage = req.file.path;
            }

            product.save((err, result) => {
                if (err) {
                    res.status(500).json({
                        error: err
                    });
                } else {
                    res.status(201).json({
                        data: result,
                        message: 'Product created successfully'
                    });
                }
            });
        }
    });
});

// Getting single product
router.get('/:productId', (req, res) => {
    const id = req.params.productId;
    Product.findById(id, '-__v', (err, product) => {
        if (err) {
            res.status(500).json({
                error: err
            });
        } else if (!product) {
            res.status(404).json({
                message: 'There are no products to show for provided ID'
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
    Product.findByIdAndUpdate(id, { $set: updateOps }, (err, updatedProduct) => {
        if (err) {
            res.status(500).json({
                error: err
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
                error: err
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