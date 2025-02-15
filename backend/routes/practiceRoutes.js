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

router.post("/run", async (req, res) => {
    try {
      const { sourceCode, languageId, stdin } = req.body;
  
      if (!sourceCode || !languageId) {
        return res.status(400).json({ error: "Source code and language ID are required" });
      }
  
      const options = {
        method: "POST",
        url: `${process.env.JUDGE0_API_URL}/submissions?base64_encoded=false&wait=true`,
        headers: {
          "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
          "X-RapidAPI-Key": process.env.JUDGE0_API_KEY,
          "Content-Type": "application/json",
        },
        data: {
          source_code: sourceCode,
          language_id: languageId,
          stdin: stdin || "",
        },
      };
  
      const response = await axios.request(options);
  
      res.status(200).json(response.data);
    } catch (error) {
      console.error("Execution error:", error);
      res.status(500).json({ error: "Failed to execute code" });
    }
  });
  
module.exports = router;
