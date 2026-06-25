const mongoose = require('mongoose');

const contactRequestSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  phone: { type: String, required: true, trim: true },
  email: { type: String, trim: true },
  service: { type: String, trim: true },
  message: { type: String, trim: true },
  status: {
    type: String,
    enum: ['new', 'in_progress', 'done'],
    default: 'new'
  }
}, { timestamps: true });

module.exports = mongoose.model('ContactRequest', contactRequestSchema);
