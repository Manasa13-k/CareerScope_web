const express = require('express');
const router = express.Router();
const Shortlist = require('../models/Shortlist');
const { protect } = require('../middleware/auth');

// @route   GET /api/shortlist
// @desc    Get logged in user's shortlist (saved courses and careers)
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    let shortlist = await Shortlist.findOne({ user: req.user._id })
      .populate('courses')
      .populate('careers');

    if (!shortlist) {
      shortlist = await Shortlist.create({
        user: req.user._id,
        courses: [],
        careers: [],
      });
    }

    return res.json({
      success: true,
      shortlist,
    });
  } catch (error) {
    console.error('Get Shortlist Error:', error);
    return res.status(500).json({ success: false, message: 'Server Error fetching shortlist' });
  }
});

// @route   POST /api/shortlist
// @desc    Add a course or career to shortlist
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const { courseId, careerId } = req.body;

    let shortlist = await Shortlist.findOne({ user: req.user._id });

    if (!shortlist) {
      shortlist = new Shortlist({
        user: req.user._id,
        courses: [],
        careers: [],
      });
    }

    if (courseId) {
      if (!shortlist.courses.includes(courseId)) {
        shortlist.courses.push(courseId);
      }
    }

    if (careerId) {
      if (!shortlist.careers.includes(careerId)) {
        shortlist.careers.push(careerId);
      }
    }

    await shortlist.save();

    const populatedShortlist = await Shortlist.findById(shortlist._id)
      .populate('courses')
      .populate('careers');

    return res.json({
      success: true,
      message: 'Added to shortlist successfully',
      shortlist: populatedShortlist,
    });
  } catch (error) {
    console.error('Add to Shortlist Error:', error);
    return res.status(500).json({ success: false, message: 'Failed to add item to shortlist' });
  }
});

// @route   DELETE /api/shortlist/:id
// @desc    Remove a course or career from shortlist by item ID
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const itemId = req.params.id;

    let shortlist = await Shortlist.findOne({ user: req.user._id });

    if (!shortlist) {
      return res.status(404).json({ success: false, message: 'Shortlist not found' });
    }

    // Filter out item from both courses and careers
    shortlist.courses = shortlist.courses.filter(c => c.toString() !== itemId);
    shortlist.careers = shortlist.careers.filter(c => c.toString() !== itemId);

    await shortlist.save();

    const populatedShortlist = await Shortlist.findById(shortlist._id)
      .populate('courses')
      .populate('careers');

    return res.json({
      success: true,
      message: 'Item removed from shortlist',
      shortlist: populatedShortlist,
    });
  } catch (error) {
    console.error('Delete Shortlist Item Error:', error);
    return res.status(500).json({ success: false, message: 'Failed to remove item from shortlist' });
  }
});

module.exports = router;
