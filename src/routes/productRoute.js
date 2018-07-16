const express = require('express');
const router = express.Router();
const multer = require('multer');
const verifyAuth = require('../auth/verify-auth');
const products = require('../controllers/product');
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
router.get('/', products.getAllProducts);

// Creating a product
router.post('/', verifyAuth, upload.single('productImage'), products.postingProduct);

// Getting single product
router.get('/:productId', products.gettingSingleProduct);

// Updating a product
router.patch('/:productId', verifyAuth, products.updatingProduct);

// Deleting a product
router.delete('/:productId', verifyAuth, products.deletingProduct);

module.exports = router;