import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import "./theory.css";

const Theory = () => {
  const { id } = useParams(); // Get lesson ID from URL
  const [lesson, setLesson] = useState(null); // State to hold lesson details
  const [subLessons, setSubLessons] = useState([]); // State to hold sublessons
  const [currentSubLesson, setCurrentSubLesson] = useState(null); // Current sublesson
  const [error, setError] = useState(""); // State to handle errors
  const navigate = useNavigate();

  // Fetch lesson theory content
  const fetchTheoryContent = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5000/api/v1/homepage/lessons/${id}/theory`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch lesson theory content");
      }

      const data = await response.json();
      setLesson(data);
      setSubLessons(data.subLessons || []); // Ensure subLessons is always an array

      // Set the first sublesson if available
      if (data.subLessons && data.subLessons.length > 0) {
        setCurrentSubLesson(data.subLessons[0]);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchTheoryContent();
  }, [id]);

  const toggleSubLessonCompletion = async (subLessonId) => {
    try {
      const token = localStorage.getItem("token");
      await fetch(
        `http://localhost:5000/api/v1/homepage/lessons/${id}/sublessons/${subLessonId}`,
        {
          method: "PUT",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchTheoryContent(); // Refresh data
    } catch (err) {
      setError("Failed to update sublesson");
    }
  };

  const handleNextSubLesson = () => {
    const currentIndex = subLessons.findIndex(
      (subLesson) => subLesson._id === currentSubLesson._id
    );

    if (currentIndex !== -1 && currentIndex < subLessons.length - 1) {
      setCurrentSubLesson(subLessons[currentIndex + 1]);
    } else {
      setCurrentSubLesson(subLessons[0]); // Loop back to the first sublesson
    }
  };

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
          <div className="lesson-icon">
            <div className="icon-circle"></div>
          </div>
          <div className="lesson-details">
            <h2 className="lesson-title">{lesson.subtitle}</h2>
            <p className="lesson-subtitle">{lesson.title}</p>
          </div>
        </div>

        {/* Middle Section */}
        <div className="theory-middle">
          {currentSubLesson ? (
            <>
              <h2 className="sublesson-title">{currentSubLesson.title}</h2>
              <p className="sublesson-body">{currentSubLesson.content}</p>
              <div className="button-group">
                <Link to="/home" className="button">Back to homepage</Link>
                <button
                  className="button"
                  onClick={() => toggleSubLessonCompletion(currentSubLesson._id)}
                >
                  {currentSubLesson.isCompleted
                    ? "Mark Incomplete"
                    : "Mark Complete"}
                </button>
                <button className="button" onClick={handleNextSubLesson}>
                  Next Sublesson
                </button>
              </div>
            </>
          ) : (
            <p>No sublessons available.</p>
          )}
        </div>

        {/* Right Section */}
        <div className="theory-right">
          <div className="content-header">{lesson.title} Content</div>
          <ul className="content-list">
            {subLessons.map((subLesson) => (
              <li key={subLesson._id}>
                <button
                  className={`sublesson-button ${
                    subLesson.isCompleted ? "completed" : ""
                  }`}
                  onClick={() => setCurrentSubLesson(subLesson)}
                >
                  {subLesson.title}
                </button>
              </li>
            ))}
          </ul>
<<<<<<< HEAD
          <button
            className="practice-button"
            onClick={() => navigate(`/practice/${id}`)}
          >
            practice
          </button>
=======
          {/* Updated Practice Button */}
          <Link to="/practice" className="practice-button">practice</Link>
>>>>>>> origin/main
        </div>
      </div>
    </div>
  );
};

export default Theory;
