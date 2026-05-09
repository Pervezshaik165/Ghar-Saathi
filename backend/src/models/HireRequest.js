const mongoose = require('mongoose');

const HireRequestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String },
  phone: { type: String },
  service: { type: String },
  address: { type: String },
  notes: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('HireRequest', HireRequestSchema);
