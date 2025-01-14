const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
  theoryContent: {
    type: String, // Store theory content as a string
    required: true,
  },
  codingQuestions: [
    {
      title: String, // Coding question title
      difficulty: String, // e.g., Easy, Medium, Hard
      description: String, // Question description
      solution: String, // Expected solution (optional)
    },
  ],
});

module.exports = mongoose.model('Lesson', lessonSchema);
