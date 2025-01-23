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
// Updated getTheoryContent controller
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
    res.status(500).json({ error: 'Failed to fetch lesson theory content' });
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
// Fetch sublessons for a specific lesson
const getSubLessons = async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id, "subLessons");
    if (!lesson) return res.status(404).json({ error: "Lesson not found" });

    res.status(200).json({ subLessons: lesson.subLessons });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch sublessons" });
  }
};

// Mark a specific sublesson as completed
const toggleSubLessonCompletion = async (req, res) => {
  const { id, subLessonId } = req.params;
  try {
    const lesson = await Lesson.findById(id);
    if (!lesson) return res.status(404).json({ error: "Lesson not found" });

    const subLesson = lesson.subLessons.id(subLessonId);
    if (!subLesson) return res.status(404).json({ error: "Sublesson not found" });

    subLesson.isCompleted = !subLesson.isCompleted;
    await lesson.save();

    res.status(200).json({ message: "Sublesson updated successfully", subLesson });
  } catch (err) {
    res.status(500).json({ error: "Failed to update sublesson" });
  }
};

module.exports = {
  getLessons,
  getTheoryContent,
  getCodingQuestions,
  getSubLessons,
  toggleSubLessonCompletion,
};
