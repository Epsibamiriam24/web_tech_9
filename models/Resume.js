const mongoose = require('mongoose');

const ResumeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  summary: { type: String },
  skills: { type: [String], default: [] },
  created_at: { type: Date, default: Date.now }
}, { collection: 'resumes' });

module.exports = mongoose.model('Resume', ResumeSchema);
