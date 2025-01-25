import React, { useEffect, useState, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import "./theory.css";

const Theory = () => {
  const { id } = useParams();
  const [lesson, setLesson] = useState(null);
  const [error, setError] = useState("");
  const [currentSubLesson, setCurrentSubLesson] = useState(null);
  const contentRefs = useRef({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLessonContent = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `http://localhost:5000/api/v1/homepage/lessons/${id}/theory`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (!response.ok) throw new Error("Failed to fetch lesson theory content");

        const data = await response.json();
        setLesson(data);
        if (data.subLessons.length > 0) setCurrentSubLesson(data.subLessons[0]._id);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchLessonContent();
  }, [id]);

  const handleScroll = () => {
    const scrollPosition = window.scrollY + 100;
    Object.entries(contentRefs.current).forEach(([subLessonId, element]) => {
      if (element.offsetTop <= scrollPosition && element.offsetTop + element.offsetHeight > scrollPosition) {
        setCurrentSubLesson(subLessonId);
      }
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollToSublesson = (subLessonId) => {
    contentRefs.current[subLessonId]?.scrollIntoView({ behavior: "smooth" });
  };

  const markLessonComplete = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5000/api/v1/homepage/lessons/${id}/complete`,
        {
          method: "PUT",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.ok) throw new Error("Failed to mark lesson as complete");

      const updatedLesson = await response.json();
      setLesson(updatedLesson.lesson);
    } catch (err) {
      setError("Failed to update lesson");
    }
  };

  if (error) return <div>Error: {error}</div>;
  if (!lesson) return <div>Loading...</div>;

  return (
    <div className="theory-container">
      <div className="theory-header">
        <Link to="/" className="header-item">project name</Link>
        <Link to="/dashboard" className="header-item">dashboard</Link>
      </div>

      <div className="theory-main">
        <div className="theory-left">
          <div className="lesson-icon">
            <div className="icon-circle"></div>
          </div>
          <div className="lesson-details">
            <h2 className="lesson-title">{lesson.subtitle}</h2>
            <p className="lesson-subtitle">{lesson.title}</p>
          </div>
        </div>

        <div className="theory-middle">
          <h2 className="lesson-main-title">{lesson.title}</h2>
          <p className="lesson-content">{lesson.theoryContent}</p>
          <div>
            {lesson.subLessons.map((subLesson) => (
              <div
                key={subLesson._id}
                ref={(el) => (contentRefs.current[subLesson._id] = el)}
                className="sublesson-section"
              >
                <h3 className="sublesson-title">{subLesson.title}</h3>
                <p className="sublesson-content">{subLesson.content}</p>
              </div>
            ))}
          </div>
          <div className="button-group">
            <Link to="/home" className="button">Back to homepage</Link>
            <button
              className="button"
              onClick={markLessonComplete}
              disabled={lesson.subLessons.every((sl) => sl.isCompleted)}
            >
              Mark Lesson Complete
            </button>
            <button className="button" onClick={() => navigate(`/theory/${+id + 1}`)}>
              Next Lesson
            </button>
          </div>
        </div>

        <div className="theory-right">
          <div className="content-header">{lesson.title} Content</div>
          <ul className="content-list">
            {lesson.subLessons.map((subLesson) => (
              <li key={subLesson._id}>
                <button
                  className={`sublesson-button ${currentSubLesson === subLesson._id ? "active" : ""}`}
                  onClick={() => handleScrollToSublesson(subLesson._id)}
                >
                  {subLesson.title}
                </button>
              </li>
            ))}
          </ul>
          <button className="practice-button">practice</button>
        </div>
      </div>
    </div>
  );
};

export default Theory;
