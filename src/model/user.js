const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = Schema({
    email: {
        type: String, required: true, unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: { type: String, required: true, match: /(?=.*[a-zA-Z]+)(?=.*[0-9]+)(?=.*[!*&^%$#@()+]+).*/ },
    created: { type: Date, required: true, default: Date.now() }
}, { collection: 'users' });

module.exports = mongoose.model('User', userSchema);