import React from "react";
import { Link } from "react-router-dom";
import "./dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="dashboard-header">
        <Link to="/" className="header-item">project name</Link>
        <Link to="/home" className="header-item">homepage</Link>
      </div>

      {/* Main Content */}
      <div className="dashboard-content">
        {/* Left Section: Learner Profile */}
        <div className="learner-profile">
          <div className="profile-pic"></div>
          <h2 className="learner-name">Learner Name</h2>
          <p className="learner-username">@username</p>
          
          <div className="stats-box">
            <div className="stat-item">
              <h3>1</h3>
              <p>COURSES</p>
            </div>
            <div className="stat-item">
              <h3>6</h3>
              <p>QUESTIONS</p>
            </div>
          </div>
        </div>

        {/* Center Section: Total Stats */}
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

        {/* Right Section: Recommended */}
        <div className="recommended-section">
          <h2 className="section-title">Recommended</h2>
          <div className="recommended-box"></div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
