const mongoose = require('mongoose');

const CareerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  sector: {
    type: String,
    required: true,
  },
  skills: [{
    type: String,
  }],
  relatedCourses: [{
    type: String, // Course names or titles for flexible reference
  }],
  educationPaths: [{
    type: String,
  }],
  higherStudies: [{
    type: String,
  }],
  relatedRoles: [{
    type: String,
  }],
}, {
  timestamps: true,
});

module.exports = mongoose.model('Career', CareerSchema);
