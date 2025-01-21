import React from "react";
import { Link } from "react-router-dom";
import "./home.css";

const Home = () => {
  return (
    <div className="home-container">
      {/* Header */}
      <div className="home-header">
        <Link to="/" className="header-item">project name</Link>
        <Link to="/dashboard" className="header-item">dashboard</Link>
      </div>

      {/* Welcome Section */}
      <div className="welcome-section">
        <h2 className="welcome-text">
          welcome back, learner <span className="emoji">🤓</span>
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
              <button className="action-button">theory</button>
              <button className="action-button">practice</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
