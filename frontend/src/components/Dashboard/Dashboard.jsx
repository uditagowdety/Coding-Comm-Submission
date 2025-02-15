import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./dashboard.css";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [recommendedLessons, setRecommendedLessons] = useState([]);
  const [error, setError] = useState("");
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
  
        const recResponse = await fetch("http://localhost:5000/api/v1/dashboard/recommended", {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        if (!recResponse.ok) throw new Error("Failed to fetch recommended lessons");
  
        const recData = await recResponse.json();
        setRecommendedLessons(recData.recommendedLessons);
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
  
  
  // Logout user
  const handleLogout = async () => {
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

      {/* Dashboard Content */}
      <div className="dashboard-content">
        {/* Left Section: Learner Profile */}
        <div className="learner-profile">
          <div className="profile-container">
            <div className="profile-pic">
              <span className="edit-icon">✎</span>
            </div>
            <h2 className="learner-name">{userData.username}</h2>
          </div>
          <button className="logout-button" onClick={handleLogout}>Log Out</button>
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
      </div>

      {/* Recommended Section Below Stats */}
      <div className="recommended-section">
        <h2 className="section-title">Recommended Lessons</h2>
        {recommendedLessons.length > 0 ? (
          <div className="recommended-list">
            {recommendedLessons.map((lesson) => (
              <Link to={`/theory/${lesson._id}`} key={lesson._id} className="recommended-box">
                {lesson.title}
              </Link>
            ))}
          </div>
        ) : (
          <p>No recommendations at the moment 🎯</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;