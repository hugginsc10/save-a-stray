const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CatSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    sex: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    video: {
        type: String,
        required: true
    },
    application: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'applications'
    }]
});


module.exports = mongoose.model('cat', CatSchema);