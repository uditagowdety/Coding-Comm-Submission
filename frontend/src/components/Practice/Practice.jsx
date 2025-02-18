import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import "./practice.css";
import API_BASE_URL from "../../config";


const Practice = () => {
  const [practiceData, setPracticeData] = useState([]);
  const [error, setError] = useState("");
  const sectionRefs = useRef({}); // Refs for scrolling to specific sections
  const location = useLocation(); // Access lessonId passed via state

  useEffect(() => {
    const fetchPracticeQuestions = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${API_BASE_URL}/practice`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch practice questions");
        }

        const data = await response.json();
        setPracticeData(data.lessons);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchPracticeQuestions();
  }, []);

  useEffect(() => {
    if (location.state?.lessonId && sectionRefs.current[location.state.lessonId]) {
      // Scroll to the specified lesson section
      sectionRefs.current[location.state.lessonId].scrollIntoView({ behavior: "smooth" });
    }
  }, [location, practiceData]);

  if (error) return <div>Error: {error}</div>;
  if (!practiceData.length) return <div>Loading practice questions...</div>;

  return (
    <div className="practice-container">
      {/* Header */}
      <div className="practice-header">
        <Link to="/home" className="header-item">
          Homepage
        </Link>
        <Link to="/dashboard" className="header-item">
          Dashboard
        </Link>
      </div>

      {/* Title */}
      <div className="practice-title">
        <h2>
          practice questions <span className="emoji">✨</span>
        </h2>
      </div>

      {/* Questions Section */}
      <div className="questions-section">
        {practiceData.map((lesson) => (
          <div
            className="theory-group"
            key={lesson.lessonId}
            ref={(el) => (sectionRefs.current[lesson.lessonId] = el)}
          >

            {/* Theory Title (No Link Anymore) */}
            <div className="theory-title">{lesson.lessonTitle}</div>

            {/* Questions List */}
            <ul className="questions-list">
              {lesson.codingQuestions.map((question, index) => (
                <li key={index} className="question-item">
                  <div className="question-icon"></div>
                  <div className="question-text">
                    <h3>
                    <Link to={`/coding/${lesson.lessonId}/${index}`} className="question-link">{question.title}</Link>
                    </h3>
                    <p>{question.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <footer className="footer">
        <p>© {new Date().getFullYear()} CodeMaze. All rights reserved.</p>
      </footer>

    </div>

    
  );
};

export default Practice;
