const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = Schema({
    name: String,
    price: Number
}, { collection: 'products' });

module.exports = mongoose.model('Product', ProductSchema);