import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./home.css";

const Home = () => {
  const [lessons, setLessons] = useState([]); // State to hold lessons
  const [error, setError] = useState(""); // State to hold errors
  const navigate = useNavigate();

  // Function to fetch lessons from the API
  const fetchLessons = async () => {
    try {
      const token = localStorage.getItem("token"); // Get the token from localStorage
      const response = await fetch("http://localhost:5000/api/v1/homepage/lessons", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch lessons");
      }

      const data = await response.json();
      setLessons(data.lessons); // Set the fetched lessons
    } catch (err) {
      setError(err.message); // Set the error message
    }
  };

  useEffect(() => {
    fetchLessons(); // Fetch lessons when the component mounts
  }, []);

  const handleNavigation = (path, lessonId) => {
    navigate(`${path}/${lessonId}`); // Navigate to the specified path with lesson ID
  };

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

      {/* Error Handling */}
      {error && <div className="error">{error}</div>}

      {/* Learning Roadmap */}
      <div className="roadmap">
        {lessons.map((lesson, index) => (
          <div className="roadmap-item" key={lesson._id}>
            <div
              className={`circle ${index === 0 ? "completed" : ""}`}
            >
              {index === 0 && <span className="checkmark">✔</span>}
            </div>
            <div className="roadmap-content">
              <h3 className="roadmap-title">{lesson.title}</h3>
              <p className="roadmap-subtitle">{lesson.subtitle}</p>
            </div>
            <div className="roadmap-actions">
              <button
                className="action-button"
                onClick={() => handleNavigation("/theory", lesson._id)}
              >
                theory
              </button>
              <button
                className="action-button"
                onClick={() => handleNavigation("/practice", lesson._id)}
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
