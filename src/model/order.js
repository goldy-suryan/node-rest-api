const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, default: 1 }
}, { collection: 'orders' });

module.exports = mongoose.model('Orders', OrderSchema);