
const mongoose = require('mongoose');
const subLessonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
});

const lessonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  subLessons: [subLessonSchema], // Add subLessons
  isCompleted: { type: Boolean, default: false },

  codingQuestions: [
    {
      title: String,
      difficulty: String,
      description: String,
      solution: String,
    },
  ],
});

module.exports = mongoose.model("Lesson", lessonSchema);
