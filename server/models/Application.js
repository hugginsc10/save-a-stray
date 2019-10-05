const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ApplicationSchema = new Schema({
    animalId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    applicationData: {
        type: String,
        required: true
    }
});


module.exports = mongoose.model('application', ApplicationSchema);