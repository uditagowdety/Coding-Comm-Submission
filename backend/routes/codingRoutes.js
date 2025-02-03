const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { getCodingQuestionById } = require('../controllers/codingController');

// Fetch a specific coding question by lesson ID & question ID
router.get('/:lessonId/:questionId', authMiddleware, getCodingQuestionById);

module.exports = router;
