const mongoose = require('mongoose');

const OptionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  categories: [{ type: String, required: true }], // e.g. ['Technology', 'Problem Solving']
});

const AssessmentQuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  options: [OptionSchema],
  category: {
    type: String,
    default: 'General',
  },
  order: {
    type: Number,
    default: 0,
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('AssessmentQuestion', AssessmentQuestionSchema);
