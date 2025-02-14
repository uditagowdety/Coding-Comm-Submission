const Lesson = require('../models/Lesson');

// Fetch all lessons for the homepage
const getLessons = async (req, res) => {
  try {
    const lessons = await Lesson.find({}, 'title subtitle');
    res.status(200).json({ lessons });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch lessons' });
  }
};

// Fetch theory content for a specific lesson
const getTheoryContent = async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id);
    if (!lesson) return res.status(404).json({ error: 'Lesson not found' });

    res.status(200).json({
      title: lesson.title,
      subtitle: lesson.subtitle,
      theoryContent: lesson.theoryContent,
      subLessons: lesson.subLessons,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch lesson theory content' });
  }
};

module.exports = {
  getLessons,
  getTheoryContent,
};
