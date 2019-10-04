const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ShelterSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    users: {
        type: String,
        required: true
    },
    paymentEmail: {
        type: String,
        required: true
    },
    animals: {
        type: String,
        required: true
    }
});


module.exports = mongoose.model('shelter', ShelterSchema);