const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/node-shop-app');

const OrderSchema = Schema({

}, { collection: 'orders' });

module.exports = mongoose.model('Orders', OrderSchema);