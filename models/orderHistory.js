const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    customerName: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    quantity: {
        type: String,
        required: true,
    },
    sellerName: {
        type: String,
        required: true,
    }
});
const order = new mongoose.model('Order', schema);
module.exports = order;