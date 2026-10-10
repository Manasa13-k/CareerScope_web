const express = require('express');
const router = express.Router();
const Course = require('../models/Course');

// @route   GET /api/courses
// @desc    Get all courses with optional filters
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { search, stream, sector, interest, duration } = req.query;

    let query = {};

    if (search) {
      const searchRegex = new RegExp(search, 'i');
      query.$or = [
        { name: searchRegex },
        { description: searchRegex },
        { degreeType: searchRegex },
        { mainSubjects: searchRegex },
        { skills: searchRegex },
      ];
    }

    if (stream && stream !== 'All') {
      query.streams = { $in: [stream] };
    }

    if (sector && sector !== 'All') {
      query.sectors = { $in: [sector] };
    }

    if (interest && interest !== 'All') {
      query.interests = { $in: [interest] };
    }

    if (duration && duration !== 'All') {
      query.duration = new RegExp(duration, 'i');
    }

    const courses = await Course.find(query);

    return res.json({
      success: true,
      count: courses.length,
      courses,
    });
  } catch (error) {
    console.error('Get Courses Error:', error);
    return res.status(500).json({ success: false, message: 'Server Error fetching courses' });
  }
});

// @route   GET /api/courses/:id
// @desc    Get single course by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }
    return res.json({
      success: true,
      course,
    });
  } catch (error) {
    console.error('Get Course Error:', error);
    return res.status(500).json({ success: false, message: 'Server Error fetching course details' });
  }
});

module.exports = router;
