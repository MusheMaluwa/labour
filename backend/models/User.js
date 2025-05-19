const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username:  { type: String, required: true },
  email:     { type: String, required: true, unique: true },
  password:  { type: String, required: true },
  role:      { type: String, enum: ['employee', 'employer', 'admin'], default: 'employee' },
  bio:       { type: String }, // "what I do" for employee
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
