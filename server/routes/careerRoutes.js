const express = require('express');
const router = express.Router();
const Career = require('../models/Career');

// @route   GET /api/careers
// @desc    Get all career paths
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { sector, search } = req.query;
    let query = {};

    if (sector && sector !== 'All') {
      query.sector = sector;
    }

    if (search) {
      const searchRegex = new RegExp(search, 'i');
      query.$or = [
        { name: searchRegex },
        { description: searchRegex },
        { skills: searchRegex },
        { relatedRoles: searchRegex },
      ];
    }

    const careers = await Career.find(query);

    return res.json({
      success: true,
      count: careers.length,
      careers,
    });
  } catch (error) {
    console.error('Get Careers Error:', error);
    return res.status(500).json({ success: false, message: 'Server Error fetching career paths' });
  }
});

// @route   GET /api/careers/:id
// @desc    Get single career path by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const career = await Career.findById(req.params.id);
    if (!career) {
      return res.status(404).json({ success: false, message: 'Career path not found' });
    }
    return res.json({
      success: true,
      career,
    });
  } catch (error) {
    console.error('Get Career Error:', error);
    return res.status(500).json({ success: false, message: 'Server Error fetching career details' });
  }
});

module.exports = router;
