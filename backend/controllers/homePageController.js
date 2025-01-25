const Lesson = require('../models/Lesson');

// Controller to fetch lessons for the homepage
const getLessons = async (req, res) => {
  try {
    // Fetch all lessons with only necessary fields for the homepage
    const lessons = await Lesson.find({}, 'title subtitle subLessons');
    res.status(200).json({
      message: `Welcome back, ${req.user.username}!`,
      lessons, // Basic details for the homepage
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch lessons' });
  }
};

// Controller to fetch theory content for a specific lesson
const getTheoryContent = async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id);
    if (!lesson) {
      return res.status(404).json({ error: 'Lesson not found' });
    }

    res.status(200).json({
      title: lesson.title,
      subtitle: lesson.subtitle,
      theoryContent: lesson.theoryContent,
      subLessons: lesson.subLessons, // Include subLessons in the response
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch lesson theory content' });
  }
};

// Controller to fetch coding questions for a specific lesson
const getCodingQuestions = async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id, 'title codingQuestions');
    if (!lesson) {
      return res.status(404).json({ error: 'Lesson not found' });
    }

    res.status(200).json({
      lessonTitle: lesson.title,
      codingQuestions: lesson.codingQuestions, // Send coding questions
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch coding questions' });
  }
};

// Controller to fetch sublessons for a specific lesson
const getSubLessons = async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id, 'subLessons');
    if (!lesson) {
      return res.status(404).json({ error: 'Lesson not found' });
    }

    res.status(200).json({ subLessons: lesson.subLessons });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch sublessons' });
  }
};

// Controller to mark an entire lesson as completed
const markLessonComplete = async (req, res) => {
  const { id } = req.params;

  try {
    const lesson = await Lesson.findById(id);
    if (!lesson) {
      return res.status(404).json({ error: 'Lesson not found' });
    }

    // Mark all sublessons as completed
    lesson.subLessons.forEach((subLesson) => {
      subLesson.isCompleted = true;
    });

    // Save the lesson
    await lesson.save();

    res.status(200).json({
      message: 'Lesson marked as complete',
      lesson,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to mark lesson as complete' });
  }
};

module.exports = {
  getLessons,
  getTheoryContent,
  getCodingQuestions,
  getSubLessons,
  markLessonComplete, // Added for lesson completion
};
