const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { getLessons, getTheoryContent} = require('../controllers/homePageController');

// Homepage - Fetch all lessons
router.get('/lessons', authMiddleware, getLessons);

// Fetch theory content for a lesson
router.get('/lessons/:id/theory', authMiddleware, getTheoryContent);


module.exports = router;
