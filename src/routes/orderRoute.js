const express = require('express');
const router = express.Router();
const verifyAuth = require('../auth/verify-auth');
const orders = require('../controllers/order')

router.get('/', verifyAuth, orders.getAllOrders);

router.post('/', verifyAuth, orders.postOrder);

router.get('/:orderId', verifyAuth, orders.getOneOrder);

router.delete('/:orderId', verifyAuth, orders.deleteAnOrder);

module.exports = router;