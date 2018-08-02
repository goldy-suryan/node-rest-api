const Product = require('../model/product');


const productCtl = {

    getAllProducts: (req, res) => {
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
                let newProduct = [];
                products.forEach((item, index, arr) => {
                    let product = item.toJSON();
                    product['links'] = {};
                    product.links['methods'] = 'GET, PATCH, DELETE';
                    product.links['self'] = `http://${req.headers.host}/products/${item['_id']}`;
                    newProduct.push(product);
                })
                res.status(200).json(newProduct);
            }
        })
    },

    postingProduct: (req, res) => {
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
    },

    gettingSingleProduct: (req, res) => {
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
    },

    updatingProduct: (req, res) => {
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
    },

    deletingProduct: (req, res) => {
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
    }
};

module.exports = productCtl;