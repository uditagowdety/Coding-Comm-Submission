import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./dashboard.css";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [recommendedLessons, setRecommendedLessons] = useState([]);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [newUsername, setNewUsername] = useState("");
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
        setRecommendedLessons(recData.recommendedLessons || []); // ✅ Ensuring an array
      } catch (err) {
        setError(err.message);
      }
    };

    fetchDashboardData(); // Initial fetch

    // ✅ Listen for updates when a lesson is completed
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
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/v1/update-username", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ username: newUsername }),
      });

      if (!response.ok) throw new Error("Failed to update username");

      setUserData({ ...userData, username: newUsername });
      setIsEditing(false);
    } catch (err) {
      setError(err.message);
    }
  };

  // Logout user
  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear token
    navigate("/login"); // Redirect to login
  };

  if (error) return <div>Error: {error}</div>;
  if (!userData) return <div>Loading...</div>;

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
            <>
              <input
                type="text"
                className="edit-input"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
              />
              <button className="save-button" onClick={handleSaveClick}>Save</button>
            </>
          ) : (
            <h2 className="username">@{userData.username}</h2>
          )}
          <button className="logout-button" onClick={handleLogout}>Log Out</button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="stats-section">
        <h2 className="stats-title">Total Stats</h2>
        <div className="stats-grid">
          <div className="stat-box">
            <span className="stat-number">{userData.skillsAchieved}</span>
            <p>Skills Achieved</p>
          </div>
          <div className="stat-box">
            <span className="stat-number">{userData.problemsSolved}</span>
            <p>Problems Solved</p>
          </div>
          <div className="stat-box">
            <span className="stat-number">{userData.streakDays}</span>
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
