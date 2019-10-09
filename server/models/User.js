// A user has a name, an email address, a date, and a password.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  userRole: {
    type: String,
    required: true
  },
  paymentEmail: {
    type: String
  },
  password: {
    type: String,
    required: true,
    min: 8,
    max: 32
  },
  date: {
    type: Date,
    default: Date.now
  },
  fbookId: {
    type: String,
  }
});


module.exports = mongoose.model('user', UserSchema);
