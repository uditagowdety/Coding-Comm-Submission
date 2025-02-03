const User = require('../models/User');

// ✅ Fetch user's progress (GET /api/v1/user/progress)
const getUserProgress = async (req, res) => {
  try {
    const userId = req.user.id; // User ID from JWT
    const user = await User.findById(userId).select("lessonProgress");
    if (!user) return res.status(404).json({ error: "User not found" });

    res.status(200).json({ lessonProgress: user.lessonProgress });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch user progress" });
  }
};

// ✅ Toggle lesson completion (PUT /api/v1/user/progress/:lessonId)
const toggleLessonCompletion = async (req, res) => {
  try {
    const userId = req.user.id; 
    const { lessonId } = req.params;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const lessonIndex = user.lessonProgress.findIndex(p => p.lessonId.toString() === lessonId);

    if (lessonIndex !== -1) {
      // ✅ If lesson is already in progress, toggle its completion status
      user.lessonProgress[lessonIndex].isCompleted = !user.lessonProgress[lessonIndex].isCompleted;
    } else {
      // ✅ If lesson is not tracked yet, add it as new
      user.lessonProgress.push({ lessonId, isCompleted: true });
    }

    await user.save();

    res.status(200).json({ message: "Lesson progress updated", lessonProgress: user.lessonProgress });
  } catch (err) {
    res.status(500).json({ error: "Failed to update lesson progress" });
  }
};

module.exports = { getUserProgress, toggleLessonCompletion };
