const mongoose = require('mongoose');

const ShortlistSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  courses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
  }],
  careers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Career',
  }],
}, {
  timestamps: true,
});

module.exports = mongoose.model('Shortlist', ShortlistSchema);
