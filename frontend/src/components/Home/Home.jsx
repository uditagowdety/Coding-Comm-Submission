import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./home.css";
import API_BASE_URL from "../../config";


const Home = () => {
  const [lessons, setLessons] = useState([]); // State to hold lessons
  const [error, setError] = useState(""); // State to hold errors
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();

  // Function to fetch lessons from the API
  const fetchLessons = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/homepage/lessons`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      if (!response.ok) throw new Error("Failed to fetch lessons");
  
      const data = await response.json();
  
      // Fetch user progress separately
      const progressResponse = await fetch(`${API_BASE_URL}/user/progress`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      if (!progressResponse.ok) throw new Error("Failed to fetch progress");
  
      const progressData = await progressResponse.json();
  
      // Merge user progress into lessons
      const updatedLessons = data.lessons.map((lesson) => ({
        ...lesson,
        isCompleted: progressData.lessonProgress.some(p => p.lessonId === lesson._id && p.isCompleted),
      }));
  
      setLessons(updatedLessons);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchLessons(); // Fetch lessons when the component mounts
  }, []);

  const handleNavigation = (path, lessonId) => {
    navigate(`${path}/${lessonId}`); // Navigate to the specified path with lesson ID
  };

  if (loading) return <div>Loading lessons...</div>;
  if (error) return <div>Error: {error}</div>;

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
        {lessons.map((lesson) => (
          <div className="roadmap-item" key={lesson._id}>
            {/* Lesson Completion Indicator */}
            <div className={`circle ${lesson.isCompleted ? "completed" : ""}`}>
              {lesson.isCompleted && <span className="checkmark">✔</span>}
            </div>

            {/* Lesson Details */}
            <div className="roadmap-content">
              <h3 className="roadmap-title">{lesson.title}</h3>
              <p className="roadmap-subtitle">{lesson.subtitle}</p>
            </div>

            {/* Action Buttons */}
            <div className="roadmap-actions">
              <button className="action-button" onClick={() => handleNavigation("/theory", lesson._id)}>
                theory
              </button>
              <button className="action-button" onClick={() => handleNavigation("/practice", lesson._id)}>
                practice
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer className="footer">
        © {new Date().getFullYear()} CodeMaze | All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
