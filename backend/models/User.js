const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  profilePic: { type: String, default: "" },
  skillsAchieved: { type: Number, default: 0 },
  problemsSolved: { type: Number, default: 0 },
  streakDays: { type: Number, default: 0 }, // ✅ Track streak count
  lastLessonDate: { type: Date, default: null }, // ✅ Track last lesson completion date
  lessonProgress: [
    {
      lessonId: mongoose.Schema.Types.ObjectId,
      isCompleted: { type: Boolean, default: false },
    }
  ],
});

module.exports = mongoose.model("User", userSchema);
