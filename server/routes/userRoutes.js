const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { protect } = require('../middleware/auth');

// @route   GET /api/users/profile
// @desc    Get logged in student profile
// @access  Private
router.get('/profile', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    return res.json({ success: true, user });
  } catch (error) {
    console.error('Get Profile Error:', error);
    return res.status(500).json({ success: false, message: 'Failed to fetch profile' });
  }
});

// @route   PUT /api/users/profile
// @desc    Update student profile details
// @access  Private
router.put('/profile', protect, async (req, res) => {
  try {
    const { name, stream, subjects, interests, preferredSectors, skills } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (name !== undefined) user.name = name;
    if (stream !== undefined) user.stream = stream;
    if (subjects !== undefined) user.subjects = subjects;
    if (interests !== undefined) user.interests = interests;
    if (preferredSectors !== undefined) user.preferredSectors = preferredSectors;
    if (skills !== undefined) user.skills = skills;

    const updatedUser = await user.save();

    return res.json({
      success: true,
      user: updatedUser,
      message: 'Profile updated successfully',
    });
  } catch (error) {
    console.error('Update Profile Error:', error);
    return res.status(500).json({ success: false, message: 'Failed to update profile' });
  }
});

module.exports = router;
