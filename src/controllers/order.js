const Order = require('../model/order');

const orderCtl = {
    getAllOrders: (req, res) => {
        Order.find({})
            .select('-__v')
            .populate('productId', '-__v') //populating orderSchema field productId
            .exec((err, result) => {
                if (err) {
                    res.status(500).json({
                        error: err
                    });
                } else if (!result) {
                    res.status(200).json({
                        message: 'No order placed till yet, place some order'
                    });
                } else {
                    console.log(result);
                    res.status(200).json({
                        result,
                        count: result.map(() => {
                            return result.length
                        })[0]
                    });
                }
            });
    },

    postOrder: (req, res) => {
        const order = new Order();
        order.productId = req.body.productId;
        if (req.body.quantity) {
            order.quantity = req.body.quantity;
        }

        Order.find({ productId: order.productId }, (err, response) => {
            if (err) {
                res.status(500).json({
                    error: err
                });
            } else if (response.length) {
                res.status(400).json({
                    message: 'product is already been placed with this order'
                });
            } else {
                order.save((err, result) => {
                    if (err) {
                        res.status(500).json({
                            error: err
                        });
                    } else {
                        res.status(201).json({
                            message: 'order placed successfully',
                            data: result
                        });
                    }
                });
            }
        })
    },

    getOneOrder: (req, res) => {
        const id = req.params.orderId;
        Order.findById(id)
            .select('-__v')
            .populate('productId', '-__v')
            .exec((err, response) => {
                if (err) {
                    res.status(500).json({
                        error: err
                    });
                } else if (!response) {
                    res.status(404).json({
                        message: 'No order placed with this Id'
                    });
                } else {
                    res.status(200).json(response);
                }
            });
    },

    deleteAnOrder: (req, res) => {
        const id = req.params.orderId;
        Order.findByIdAndRemove(id, (err, response) => {
            if (err) {
                res.status(500).json({
                    error: err
                });
            } else if (!response) {
                res.status(404).json({
                    message: 'Unable to find the order'
                });
            } else {
                res.status(200).json({
                    message: 'Order deleted successfully',
                    data: response
                })
            }
        });
    }
};

module.exports = orderCtl;