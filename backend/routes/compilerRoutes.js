const express = require("express");
const router = express.Router();
const axios = require("axios");
require("dotenv").config();

// Endpoint to run code
router.post("/run", async (req, res) => {
  try {
    const { sourceCode, languageId, stdin } = req.body;

    if (!sourceCode || !languageId) {
      return res.status(400).json({ error: "Source code and language ID are required" });
    }

    // Configure API request to Judge0
    const response = await axios.post(
      `${process.env.JUDGE0_API_URL}/submissions?base64_encoded=false&wait=true`,
      {
        source_code: sourceCode,
        language_id: languageId,
        stdin: stdin || "", // Provide input if needed
      },
      {
        headers: {
          "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
          "X-RapidAPI-Key": process.env.JUDGE0_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Execution error:", error);
    res.status(500).json({ error: "Failed to execute code" });
  }
});

module.exports = router;
