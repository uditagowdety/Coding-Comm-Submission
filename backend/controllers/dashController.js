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
const updateUsername = async (req, res) => {
  try {
    const userId = req.user.id; // Extract user ID from JWT token
    const { username } = req.body;

    if (!username || username.trim() === "") {
      return res.status(400).json({ error: "Username cannot be empty" });
    }

    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser && existingUser._id.toString() !== userId) {
      return res.status(400).json({ error: "Username already taken" });
    }

    // Update the username
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { username },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "Username updated successfully", username: updatedUser.username });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update username" });
  }
};

// Logout user (invalidate token on frontend)
const logoutUser = (req, res) => {
  res.status(200).json({ message: "Logged out successfully" });
};

module.exports = { getUserDashboard, updateUsername,getRecommendedLessons, logoutUser };
