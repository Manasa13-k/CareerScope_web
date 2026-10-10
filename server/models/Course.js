const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  streams: [{
    type: String,
    enum: ['MPC', 'BiPC', 'MEC', 'CEC', 'Other'],
  }],
  subjects: [{
    type: String,
    trim: true,
  }],
  interests: [{
    type: String,
    trim: true,
  }],
  sectors: [{
    type: String,
    trim: true,
  }],
  duration: {
    type: String,
    required: true, // e.g. "3 Years", "4 Years"
  },
  degreeType: {
    type: String,
    required: true, // e.g. "Bachelor of Technology", "Bachelor of Science"
  },
  eligibility: {
    type: String,
    required: true, // General eligibility text
  },
  mainSubjects: [{
    type: String,
  }],
  skills: [{
    type: String,
  }],
  higherStudies: [{
    type: String,
  }],
  careerPaths: [{
    type: String,
  }],
  jobRoles: [{
    type: String,
  }],
}, {
  timestamps: true,
});

module.exports = mongoose.model('Course', CourseSchema);
