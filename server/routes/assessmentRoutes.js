const express = require('express');
const router = express.Router();
const AssessmentQuestion = require('../models/AssessmentQuestion');
const User = require('../models/User');
const { protect } = require('../middleware/auth');

// @route   GET /api/assessment/questions
// @desc    Get assessment questions for the multi-step quiz
// @access  Public
router.get('/questions', async (req, res) => {
  try {
    const questions = await AssessmentQuestion.find().sort({ order: 1 });
    return res.json({
      success: true,
      count: questions.length,
      questions,
    });
  } catch (error) {
    console.error('Get Questions Error:', error);
    return res.status(500).json({ success: false, message: 'Server Error fetching assessment questions' });
  }
});

// @route   POST /api/assessment/submit
// @desc    Submit assessment answers, evaluate interest profile, update user
// @access  Private
router.post('/submit', protect, async (req, res) => {
  try {
    const { answers } = req.body; // Array of selected option categories or option indices

    if (!answers || !Array.isArray(answers)) {
      return res.status(400).json({ success: false, message: 'Answers array is required' });
    }

    // Tally interest category scores
    const categoryScores = {};

    answers.forEach((selectedCategories) => {
      if (Array.isArray(selectedCategories)) {
        selectedCategories.forEach(cat => {
          categoryScores[cat] = (categoryScores[cat] || 0) + 1;
        });
      } else if (typeof selectedCategories === 'string') {
        categoryScores[selectedCategories] = (categoryScores[selectedCategories] || 0) + 1;
      }
    });

    // Sort categories by score descending
    const sortedCategories = Object.keys(categoryScores).sort(
      (a, b) => categoryScores[b] - categoryScores[a]
    );

    const topInterests = sortedCategories.slice(0, 4);

    // Update user profile in database
    const user = await User.findById(req.user._id);
    if (user) {
      user.assessmentResults = {
        scores: categoryScores,
        topInterests: topInterests,
        completedAt: new Date(),
      };

      // Merge topInterests into user.interests if not already present
      const combinedInterests = new Set([...(user.interests || []), ...topInterests]);
      user.interests = Array.from(combinedInterests);

      await user.save();
    }

    // Format interest level indicators (High, Medium, Low)
    const formattedProfile = Object.keys(categoryScores).map(cat => {
      const val = categoryScores[cat];
      let level = 'Low';
      if (val >= 3) level = 'High';
      else if (val >= 2) level = 'Medium';

      return {
        category: cat,
        score: val,
        level: level,
      };
    }).sort((a, b) => b.score - a.score);

    return res.json({
      success: true,
      message: 'Assessment completed successfully',
      assessmentResults: {
        scores: categoryScores,
        topInterests,
        formattedProfile,
      },
    });
  } catch (error) {
    console.error('Submit Assessment Error:', error);
    return res.status(500).json({ success: false, message: 'Failed to process assessment submission' });
  }
});

module.exports = router;
