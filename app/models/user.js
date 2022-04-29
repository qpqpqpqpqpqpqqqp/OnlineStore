const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    firstName: {
        type: String,
        default: ''
    },
    lastName: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    postIndex: {
        type: String,
        required: true,
    }
});
const user = new mongoose.model('User', schema);
module.exports = user;