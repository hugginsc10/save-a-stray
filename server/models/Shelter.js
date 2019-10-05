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
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }],
    paymentEmail: {
        type: String,
        required: true
    },
    animals: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'animal'
    }]
});


module.exports = mongoose.model('shelter', ShelterSchema);