const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  lessonProgress: [
    {
      lessonId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' },
      isCompleted: { type: Boolean, default: false },
    }
  ],
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
