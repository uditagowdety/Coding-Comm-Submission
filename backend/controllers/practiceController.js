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
const getCodingQuestionById = async (req, res) => {
  try {
    const { lessonId, questionIndex } = req.params;

    // Validate lessonId
    if (!lessonId || lessonId.length !== 24) {
      return res.status(400).json({ error: "Invalid lesson ID" });
    }

    const lesson = await Lesson.findById(lessonId);
    if (!lesson) return res.status(404).json({ error: "Lesson not found" });

    // Ensure question index is valid
    if (!lesson.codingQuestions || lesson.codingQuestions.length <= questionIndex) {
      return res.status(404).json({ error: "Question not found" });
    }

    // Convert questionIndex to number
    const question = lesson.codingQuestions[parseInt(questionIndex, 10)];

    res.status(200).json({
      lessonTitle: lesson.title,
      questionTitle: question.title,
      difficulty: question.difficulty,
      description: question.description,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch coding question" });
  }
};



module.exports = { getAllPracticeQuestions, getCodingQuestionById };
