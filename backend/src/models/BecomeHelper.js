const mongoose = require('mongoose');

const BecomeHelperSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String },
  phone: { type: String },
  skills: { type: String },
  expectedFeeRange: { type: String },
  experience: { type: String },
  portfolio: { type: String },
  address: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('BecomeHelper', BecomeHelperSchema);
