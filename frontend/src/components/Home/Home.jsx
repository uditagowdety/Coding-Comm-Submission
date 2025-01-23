import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./home.css";

const Home = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path); // Navigate to the specified path
  };

  return (
    <div className="home-container">
      {/* Header */}
      <div className="home-header">
        <Link to="/" className="header-item">CodeMaze</Link>
        <Link to="/dashboard" className="header-item">Dashboard</Link>
      </div>

      {/* Welcome Section */}
      <div className="welcome-section">
        <h2 className="welcome-text">
          Welcome Back, Learner! <span className="emoji">✨</span>
        </h2>
      </div>

      {/* Learning Roadmap */}
      <div className="roadmap">
        {["Title 1", "Title 2", "Title 3"].map((title, index) => (
          <div className="roadmap-item" key={index}>
            <div
              className={`circle ${index === 0 ? "completed" : ""}`}
            >
              {index === 0 && <span className="checkmark">✔</span>}
            </div>
            <div className="roadmap-content">
              <h3 className="roadmap-title">{title}</h3>
              <p className="roadmap-subtitle">subtitle</p>
            </div>
            <div className="roadmap-actions">
              <button
                className="action-button"
                onClick={() => handleNavigation("/theory")}
              >
                theory
              </button>
              <button
                className="action-button"
                onClick={() => handleNavigation("/practice")}
              >
                practice
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
