const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePic: { type: String, default: "" }, // Profile picture URL
  skillsAchieved: { type: Number, default: 0 }, 
  problemsSolved: { type: Number, default: 0 },
  streakDays: { type: Number, default: 0 },
  lessonProgress: [
    {
      lessonId: { type: mongoose.Schema.Types.ObjectId, ref: "Lesson" },
      isCompleted: { type: Boolean, default: false },
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
