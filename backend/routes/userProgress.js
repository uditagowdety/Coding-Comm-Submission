const express = require('express');
const { getUserProgress, toggleLessonCompletion } = require('../controllers/progressController');
const authMiddleware = require('../middleware/authMiddleware'); 

const router = express.Router();

router.get('/progress', authMiddleware, getUserProgress); 
router.put('/progress/:lessonId', authMiddleware, toggleLessonCompletion);

module.exports = router;
