const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const User = require('../models/User');
const { protect } = require('../middleware/auth');
const { getRecommendations } = require('../services/recommendationService');

// @route   GET /api/recommendations
// @desc    Get course recommendations tailored to the logged-in user
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User profile not found' });
    }

    const courses = await Course.find();

    const recommendations = getRecommendations(user, courses);

    return res.json({
      success: true,
      count: recommendations.length,
      userStream: user.stream,
      userInterests: user.interests,
      recommendations,
    });
  } catch (error) {
    console.error('Get Recommendations Error:', error);
    return res.status(500).json({ success: false, message: 'Server Error generating recommendations' });
  }
});

module.exports = router;
