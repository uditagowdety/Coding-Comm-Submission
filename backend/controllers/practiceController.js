const Lesson = require('../models/Lesson');

const getAllPracticeQuestions = async (req, res) => {
  try {
    // Fetch all lessons with their coding questions
    const lessons = await Lesson.find({}, 'title subtitle codingQuestions');
    if (!lessons) {
      return res.status(404).json({ error: 'No lessons found' });
    }

    // Return grouped questions by lesson
    res.status(200).json({
      lessons: lessons.map((lesson) => ({
        lessonId: lesson._id,
        lessonTitle: lesson.title,
        lessonSubtitle: lesson.subtitle,
        codingQuestions: lesson.codingQuestions,
      })),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch practice questions' });
  }
};

module.exports = { getAllPracticeQuestions };
