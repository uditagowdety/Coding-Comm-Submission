const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { getAllPracticeQuestions } = require('../controllers/practiceController');
const { getCodingQuestionById } = require('../controllers/practiceController');

const axios = require("axios");
require("dotenv").config();

// Fetch all practice questions grouped by lesson
router.get('/', authMiddleware, getAllPracticeQuestions);

// Fetch a specific coding question by lesson ID & question ID
router.get('/coding/:lessonId/:questionIndex', authMiddleware, getCodingQuestionById);

  
module.exports = router;
