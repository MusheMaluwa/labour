const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  title:    { type: String, required: true },
  company:  { type: String, required: true },
  desc:     { type: String },
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

module.exports = mongoose.model('Job', JobSchema);
