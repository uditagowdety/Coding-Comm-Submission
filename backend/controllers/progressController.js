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
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to midnight for proper date comparison

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    let lessonProgress = user.lessonProgress.find(p => p.lessonId.toString() === lessonId);

    if (lessonProgress) {
      lessonProgress.isCompleted = !lessonProgress.isCompleted;
    } else {
      user.lessonProgress.push({ lessonId, isCompleted: true });
    }

    // ✅ Update the count of completed lessons
    user.skillsAchieved = user.lessonProgress.filter(p => p.isCompleted).length;

    // ✅ Streak logic (only runs when marking a lesson as completed)
    if (lessonProgress?.isCompleted) {
      const lastLessonDate = user.lastLessonDate ? new Date(user.lastLessonDate).setHours(0, 0, 0, 0) : null;

      if (lastLessonDate === today - 86400000) {
        user.streakDays += 1; // Continue streak if last lesson was yesterday
      } else if (lastLessonDate !== today) {
        user.streakDays = 1; // Reset streak if missed a day
      }

      user.lastLessonDate = today; // Update last completed lesson date
    }

    // ✅ Reset streak if no lessons are completed
    if (user.skillsAchieved === 0) {
      user.streakDays = 0;
      user.lastLessonDate = null;
    }

    await user.save();
    res.status(200).json({
      message: "Lesson completion status updated",
      lessonProgress: user.lessonProgress,
      skillsAchieved: user.skillsAchieved,
      streakDays: user.streakDays,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update lesson progress" });
  }
};



module.exports = { getUserProgress, toggleLessonCompletion };
