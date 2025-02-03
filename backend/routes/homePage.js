const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { getLessons, getTheoryContent, getCodingQuestions } = require('../controllers/homePageController');
const { getAllPracticeQuestions } = require('../controllers/practiceController');
const { getCodingQuestionById } = require('../controllers/codingController');

// Homepage - Fetch all lessons
router.get('/lessons', authMiddleware, getLessons);

// Fetch theory content for a lesson
router.get('/lessons/:id/theory', authMiddleware, getTheoryContent);


// Fetch all practice questions
router.get('/practice', authMiddleware, getAllPracticeQuestions);

// Fetch a specific coding question
router.get('/coding/:lessonId/:questionId', authMiddleware, getCodingQuestionById);

module.exports = router;
