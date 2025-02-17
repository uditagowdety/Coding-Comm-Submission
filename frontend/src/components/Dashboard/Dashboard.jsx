import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./dashboard.css";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [recommendedLessons, setRecommendedLessons] = useState([]);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await fetch("http://localhost:5000/api/v1/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error("Failed to fetch user data");

        const data = await response.json();
        setUserData(data);
        setNewUsername(data.username);

        const recResponse = await fetch("http://localhost:5000/api/v1/dashboard/recommended", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!recResponse.ok) throw new Error("Failed to fetch recommended lessons");

        const recData = await recResponse.json();
        setRecommendedLessons(recData.recommendedLessons || []);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchDashboardData();

    // Listen for updates when a lesson is completed
    const updateListener = () => fetchDashboardData();
    window.addEventListener("dashboardUpdate", updateListener);

    return () => window.removeEventListener("dashboardUpdate", updateListener);
  }, [navigate]);

  // Handle Edit
  const handleEditClick = () => {
    setIsEditing(true);
  };

  // Handle Save
  const handleSaveClick = async () => {
    if (!newUsername.trim()) {
      setError("Username cannot be empty.");
      return;
    }

    if (newUsername === userData.username) {
      setIsEditing(false); // No change, just exit edit mode
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/v1/dashboard/update-username", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ username: newUsername.trim() }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update username");
      }

      const data = await response.json();
      setUserData({ ...userData, username: data.username });
      setIsEditing(false);
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle Cancel
  const handleCancelClick = () => {
    setNewUsername(userData.username);
    setIsEditing(false);
    setError("");
  };

  // Logout user
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (error) return <div className="error-message">Error: {error}</div>;
  if (!userData) return <div className="loading-message">Loading...</div>;

  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="dashboard-header">
        <Link to="/" className="header-item">CodeMaze</Link>
        <Link to="/home" className="header-item">Homepage</Link>
      </div>

      {/* Profile Section */}
      <div className="profile-section">
        <div className="profile-card">
          <div className="profile-pic-container">
            <div className="profile-pic"></div>
            <button className="edit-profile-btn" onClick={handleEditClick}>✏️</button>
          </div>
          {isEditing ? (
            <div className="edit-container">
              <input
                type="text"
                className="edit-input"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                maxLength={20}
              />
              <div className="edit-buttons">
                <button className="save-button" onClick={handleSaveClick} disabled={loading || newUsername === userData.username}>
                  {loading ? "Saving..." : "Save"}
                </button>
                <button className="cancel-button" onClick={handleCancelClick}>Cancel</button>
              </div>
              {error && <p className="error-text">{error}</p>}
            </div>
          ) : (
            <h2 className="username">@{userData.username}</h2>
          )}
          <button className="logout-button" onClick={handleLogout}>Log Out</button>
        </div>
      </div>

      {/* Middle Section: Stats */}
      <div className="stats-section">
        <h2 className="section-title">Total Stats</h2>
        <div className="stats-grid">
          <div className="stat-box">
            <h3>{userData.skillsAchieved}</h3>
            <p>Skills Achieved</p>
          </div>
          <div className="stat-box">
            <h3>{userData.problemsSolved}</h3>
            <p>Problems Solved</p>
          </div>
          <div className="stat-box">
            <h3>{userData.streakDays}</h3>
            <p>Streak Days 🔥</p>
          </div>
        </div>
      </div>

      {/* Recommended Lessons */}
      <div className="recommended-section">
        <h2 className="section-title">Recommended Lessons</h2>
        {recommendedLessons.length > 0 ? (
          <div className="recommended-list">
            {recommendedLessons.map((lesson) => (
              <Link to={`/theory/${lesson._id}`} key={lesson._id} className="lesson-card">
                {lesson.title}
              </Link>
            ))}
          </div>
        ) : (
          <p>No recommendations at the moment 🎯</p>
        )}
      </div>

      {/* Footer */}
      <footer className="dashboard-footer">
        <p>&copy; 2025 CodeMaze. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Dashboard;
