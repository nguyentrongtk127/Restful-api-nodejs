const mongoose = require('mongoose')

const subscriberSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  birthday: {
    type: Date,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})
module.exports = mongoose.model('users', subscriberSchema)