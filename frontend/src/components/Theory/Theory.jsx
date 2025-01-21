import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import "./theory.css";

const Theory = () => {
  const { id } = useParams();
  console.log("Lesson ID from URL:", id);  // Extract the lesson ID from the URL
  const [lesson, setLesson] = useState(null); // State to hold lesson details
  const [error, setError] = useState(""); // State to handle errors
  const navigate = useNavigate();

  // Function to fetch theory content for the lesson
  const fetchTheoryContent = async () => {
    try {
      const token = localStorage.getItem("token"); // Get token from localStorage
      const response = await fetch(`http://localhost:5000/api/v1/homepage/lessons/${id}/theory`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("API response status:", response.status);
      if (!response.ok) {
        throw new Error("Failed to fetch lesson theory content");
      }

      const data = await response.json();
      setLesson(data); // Set the fetched lesson data
    } catch (err) {
      setError(err.message); // Set the error message
    }
  };

  useEffect(() => {
    fetchTheoryContent(); // Fetch theory content when the component mounts
  }, [id]); // Re-run if the ID changes

  if (error) return <div>Error: {error}</div>;
  if (!lesson) return <div>Loading...</div>;

  return (
    <div className="theory-container">
      {/* Header */}
      <div className="theory-header">
        <Link to="/" className="header-item">project name</Link>
        <Link to="/dashboard" className="header-item">dashboard</Link>
      </div>

      {/* Main Content */}
      <div className="theory-main">
        {/* Left Section */}
        <div className="theory-left">
          <div className="lesson-icon"> {/* Placeholder for icon */}
            <div className="icon-circle"></div>
          </div>
          <div className="lesson-details">
            <h2 className="lesson-title">{lesson.subtitle}</h2>
            <p className="lesson-subtitle">{lesson.title}</p>
          </div>
        </div>

        {/* Middle Section */}
        <div className="theory-middle">
          <h2 className="sublesson-title">{lesson.subtitle}</h2>
          <p className="sublesson-body">{lesson.theoryContent}</p>
          <div className="button-group">
            <Link to="/home" className="button">Back to homepage</Link>
            <button
              className="button"
              onClick={() => alert("Marked as complete")}
            >
              SubLesson Complete
            </button>
            <button
              className="button"
              onClick={() => navigate(`/theory/${parseInt(id) + 1}`)}
            >
              Next Sublesson
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div className="theory-right">
          <div className="content-header">{lesson.title} Content</div>
          <ul className="content-list">
            <li>SubLesson Name1</li>
            <li>SubLesson Name2</li>
            <li>SubLesson Name3</li>
            <li>SubLesson Name4</li>
          </ul>
          <button
            className="practice-button"
            onClick={() => navigate(`/practice/${id}`)}
          >
            practice
          </button>
        </div>
      </div>
    </div>
  );
};

export default Theory;
