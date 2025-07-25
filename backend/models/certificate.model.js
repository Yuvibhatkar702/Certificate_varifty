const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const certificateSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  certificateId: { type: String, required: true, unique: true },
}, {
  timestamps: true,
});

const Certificate = mongoose.model('Certificate', certificateSchema);

module.exports = Certificate;
