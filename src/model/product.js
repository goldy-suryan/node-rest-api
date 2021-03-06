const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    productImage: { type: String, default: 'No image' }
}, { collection: 'products' });

module.exports = mongoose.model('Product', ProductSchema);