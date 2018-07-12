const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/node-shop-app');

const ProductSchema = Schema({

}, { collection: 'products' });

module.exports = mongoose.model('Product', ProductSchema);