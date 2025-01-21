const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  theoryContent: { type: String, required: true },
  codingQuestions: [
    {
      title: String,
      difficulty: String,
      description: String,
      solution: String,
    },
  ],
});

module.exports = mongoose.model('Lesson', lessonSchema);
