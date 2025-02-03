const Lesson = require('../models/Lesson');

// Fetch a specific coding question by ID
const getCodingQuestionById = async (req, res) => {
  try {
    const { lessonId, questionId } = req.params;
    const lesson = await Lesson.findById(lessonId);
    if (!lesson) return res.status(404).json({ error: 'Lesson not found' });

    const question = lesson.codingQuestions.id(questionId);
    if (!question) return res.status(404).json({ error: 'Question not found' });

    res.status(200).json({
      lessonTitle: lesson.title,
      questionTitle: question.title,
      difficulty: question.difficulty,
      description: question.description,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch coding question' });
  }
};

module.exports = { getCodingQuestionById };
