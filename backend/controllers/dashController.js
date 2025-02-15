const User = require("../models/User");
const Lesson = require("../models/Lesson");


// Fetch user dashboard details
const getUserDashboard = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId, "username profilePic skillsAchieved problemsSolved streakDays lastLessonDate lessonProgress");

    if (!user) return res.status(404).json({ error: "User not found" });

    // ✅ Recalculate completed lessons dynamically
    const completedLessons = user.lessonProgress.filter(lesson => lesson.isCompleted).length;

    // ✅ Reset streak if no lessons are completed
    if (completedLessons === 0) {
      user.streakDays = 0;
      user.lastLessonDate = null;
    }

    // ✅ Sync skillsAchieved with actual completed lessons count
    if (user.skillsAchieved !== completedLessons) {
      user.skillsAchieved = completedLessons;
      await user.save();
    }

    res.status(200).json({
      username: user.username,
      profilePic: user.profilePic,
      skillsAchieved: user.skillsAchieved,
      problemsSolved: user.problemsSolved,
      streakDays: user.streakDays,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch dashboard data" });
  }
};


// Fetch recommended lessons (e.g., incomplete lessons)
const getRecommendedLessons = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId, "lessonProgress");

    if (!user) return res.status(404).json({ error: "User not found" });

    // Fetch incomplete lessons for recommendations
    const recommendedLessons = await Lesson.find({
      _id: { $nin: user.lessonProgress.map(p => p.lessonId) }
    }, "title subtitle");

    res.status(200).json({ recommendedLessons });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch recommended lessons" });
  }
};

// Logout user (invalidate token on frontend)
const logoutUser = (req, res) => {
  res.status(200).json({ message: "Logged out successfully" });
};

module.exports = { getUserDashboard, getRecommendedLessons, logoutUser };
