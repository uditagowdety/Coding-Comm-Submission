const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');
const { getLessons, getTheoryContent, getCodingQuestions,getSubLessons,
    toggleLessonCompletion } = require('../controllers/homePageController');

const { 
    getAllPracticeQuestions  } = require('../controllers/practiceController');

// Existing route for homepage lessons
router.get('/lessons', authMiddleware, getLessons);

// New route for fetching theory content
router.get('/lessons/:id/theory', authMiddleware, getTheoryContent);

// New route for fetching coding questions
router.get('/lessons/:id/questions', authMiddleware, getCodingQuestions);

router.get("/lessons/:id/sublessons", authMiddleware, getSubLessons);

router.put("/lessons/:id/complete", authMiddleware, toggleLessonCompletion);


// Fetch all practice questions grouped by lessons
router.get('/practice', authMiddleware, getAllPracticeQuestions);
module.exports = router;
