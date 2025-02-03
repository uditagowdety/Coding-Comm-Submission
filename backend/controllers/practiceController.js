const Lesson = require('../models/Lesson');

// Fetch all practice questions grouped by lessons
const getAllPracticeQuestions = async (req, res) => {
  try {
    const lessons = await Lesson.find({}, 'title subtitle codingQuestions');
    if (!lessons || lessons.length === 0) {
      return res.status(404).json({ error: 'No lessons found' });
    }

    res.status(200).json({
      lessons: lessons.map((lesson) => ({
        lessonId: lesson._id,
        lessonTitle: lesson.title,
        lessonSubtitle: lesson.subtitle,
        codingQuestions: lesson.codingQuestions.map((q) => ({
          questionId: q._id,
          title: q.title,
          difficulty: q.difficulty,
        })),
      })),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch practice questions' });
  }
};

module.exports = { getAllPracticeQuestions };
