const mongoose = require('mongoose')
const ObjectID = mongoose.Schema.Types.ObjectId
const schema = new mongoose.Schema({
    purchaser: {
        type: ObjectID,
        // type: String,
        required: true,
        ref: 'Consumer'
    },
    items: [{
        itemId: {
            type: ObjectID,
            ref: 'Product',
            required: true
        },
        name: String,
        quantity: {
            type: Number,
            required: true,
            min: 1,
            default: 1
        },
        price: Number
    }],
    bill: {
        type: Number,
        required: true,
        default: 0
    }
}, {
    timestamps: true
});
const cart = new mongoose.model('Cart', schema);
module.exports = cart;