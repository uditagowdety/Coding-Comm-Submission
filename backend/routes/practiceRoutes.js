const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { getAllPracticeQuestions } = require('../controllers/practiceController');
const { getCodingQuestionById } = require('../controllers/codingController');

// Fetch all practice questions grouped by lesson
router.get('/', authMiddleware, getAllPracticeQuestions);

module.exports = router;
