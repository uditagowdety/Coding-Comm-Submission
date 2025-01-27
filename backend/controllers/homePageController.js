const Lesson = require('../models/Lesson');

// Controller to fetch lessons for the homepage
const getLessons = async (req, res) => {
  try {
    // Fetch all lessons with only necessary fields for the homepage
    const lessons = await Lesson.find({}, 'title subtitle subLessons isCompleted');
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
      isCompleted: lesson.isCompleted,
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

const toggleLessonCompletion = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the lesson by ID
    const lesson = await Lesson.findById(id);
    if (!lesson) return res.status(404).json({ error: "Lesson not found" });

    // Toggle the isCompleted status
    lesson.isCompleted = !lesson.isCompleted;
    await lesson.save(); // Save changes to the database

    // Send back the updated lesson
    res.status(200).json({ message: "Lesson updated successfully", lesson });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update lesson" });
  }
};


module.exports = {
  getLessons,
  getTheoryContent,
  getCodingQuestions,
  getSubLessons,
  toggleLessonCompletion, // Added for lesson completion
};
