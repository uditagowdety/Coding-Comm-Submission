const Lesson = require('../models/Lesson');

// Existing controller to fetch lessons for the homepage
const getLessons = async (req, res) => {
  try {
    // Fetch all lessons with only necessary fields for the homepage
    const lessons = await Lesson.find({}, 'title subtitle');

    res.status(200).json({
      message: `Welcome back, ${req.user.username}!`,
      lessons, // Basic details for the homepage
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch lessons' });
  }
};

// New controller to fetch theory content for a specific lesson
const getTheoryContent = async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id);
    if (!lesson) {
      return res.status(404).json({ error: 'Lesson not found' });
    }

    res.status(200).json({
      title: lesson.title,
      subtitle: lesson.subtitle,
      theoryContent: lesson.theoryContent, // Send full theory content
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch theory content' });
  }
};

// New controller to fetch coding questions for a specific lesson
const getCodingQuestions = async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id);
    if (!lesson) {
      return res.status(404).json({ error: 'Lesson not found' });
    }

    res.status(200).json({
      lessonTitle: lesson.title,
      codingQuestions: lesson.codingQuestions, // Send coding questions
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch coding questions' });
  }
};


module.exports = { getLessons, getTheoryContent, getCodingQuestions };
