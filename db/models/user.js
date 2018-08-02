const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  googleId: {
    required: true,
    type: String
  },
  credits: {
    type: Number,
    default: 0
  }
});

const User = mongoose.model('User', UserSchema);
module.exports = { User };