const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6,
    select: false,
  },
  role: {
    type: String,
    enum: ['student', 'admin'],
    default: 'student',
  },
  stream: {
    type: String,
    enum: ['MPC', 'BiPC', 'MEC', 'CEC', 'Other', ''],
    default: '',
  },
  subjects: [{
    type: String,
    trim: true,
  }],
  interests: [{
    type: String,
    trim: true,
  }],
  preferredSectors: [{
    type: String,
    trim: true,
  }],
  skills: [{
    type: String,
    trim: true,
  }],
  assessmentResults: {
    scores: {
      type: Map,
      of: Number,
      default: {},
    },
    topInterests: [{
      type: String,
    }],
    completedAt: {
      type: Date,
    },
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('User', UserSchema);
