const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { getUserDashboard, getRecommendedLessons, logoutUser } = require("../controllers/dashController");

// Fetch user dashboard stats
router.get("/", authMiddleware, getUserDashboard);

// Fetch recommended lessons
router.get("/recommended", authMiddleware, getRecommendedLessons);

// Logout user (handled on frontend)
router.post("/logout", authMiddleware, logoutUser);

module.exports = router;
