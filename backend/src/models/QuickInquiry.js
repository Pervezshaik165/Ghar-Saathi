const mongoose = require('mongoose');

const QuickInquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String },
  phone: { type: String },
  message: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('QuickInquiry', QuickInquirySchema);
