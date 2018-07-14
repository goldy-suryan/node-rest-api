const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = Schema({

}, { collection: 'orders' });

module.exports = mongoose.model('Orders', OrderSchema);