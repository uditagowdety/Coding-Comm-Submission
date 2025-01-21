const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');
const { getLessons, getTheoryContent, getCodingQuestions,markSubLessonCompleted,
    checkLessonCompletion } = require('../controllers/homePageController');

// Existing route for homepage lessons
router.get('/lessons', authMiddleware, getLessons);

// New route for fetching theory content
router.get('/lessons/:id/theory', authMiddleware, getTheoryContent);

// New route for fetching coding questions
router.get('/lessons/:id/questions', authMiddleware, getCodingQuestions);


module.exports = router;
