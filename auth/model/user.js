const mongoose = require('mongoose');

// Defining mongoose schema

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    minlength: 1,
    maxlength: 50,
    required: true,
  },
  lastname: {
    type: String,
    minlength: 1,
    maxlength: 50,
    required: true,
  },
  email: {
    type: String,
    minlength: 5,
    maxlength: 50,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'user',
    enum: ['admin', 'user'],
  },
}, { timestamps: true });

// renaming the collection
const User = mongoose.model('User', userSchema, 'User');

// exporting the user
module.exports = User;
