import React from "react";
import { Link } from "react-router-dom";
import "./dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="dashboard-header">
        <Link to="/" className="header-item">project name</Link>
        <Link to="/homepage" className="header-item">homepage</Link>
      </div>

      {/* Dashboard Content */}
      <div className="dashboard-content">
        {/* Left Section: Learner Profile */}
        <div className="learner-profile">
          <div className="profile-container">
            <div className="profile-pic">
              <span className="edit-icon">✎</span>
            </div>
            <h2 className="learner-name">Learner Name</h2>
            <p className="learner-username">@username</p>
          </div>
          <button className="logout-button">Log Out</button>
        </div>

        {/* Middle Section: Stats */}
        <div className="stats-section">
          <h2 className="section-title">Total Stats</h2>
          <div className="stats-grid">
            <div className="stat-box">
              <h3>1</h3>
              <p>Skills Achieved</p>
            </div>
            <div className="stat-box">
              <h3>35</h3>
              <p>Problems Solved</p>
            </div>
            <div className="stat-box">
              <h3>7</h3>
              <p>Streak Days 🔥</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Section Below Stats */}
      <div className="recommended-section">
        <h2 className="section-title">Recommended</h2>
        <div className="recommended-box"></div>
      </div>
    </div>
  );
};

export default Dashboard;
