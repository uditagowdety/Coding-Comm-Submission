import React from "react";
import { Link } from "react-router-dom";
import "./practice.css";

const Practice = () => {
  const practiceData = [
    {
      title: "theory 1",
      questions: ["question 1", "question 2"],
    },
    {
      title: "theory 2",
      questions: ["question 1", "question 2"],
    },
  ];

  return (
    <div className="practice-container">
      {/* Header */}
      <div className="practice-header">
        <Link to="/" className="header-item">project name</Link>
        <Link to="/dashboard" className="header-item">dashboard</Link>
      </div>

      {/* Title */}
      <div className="practice-title">
        <h2>
          practice questions <span className="emoji">✨</span>
        </h2>
      </div>

      {/* Questions Section */}
      <div className="questions-section">
        {practiceData.map((theory, index) => (
          <div className="theory-group" key={index}>
            {/* Theory Title */}
            <div className="theory-title">
              <span>{theory.title}</span>
            </div>

            {/* Questions */}
            <div className="questions-list">
              {theory.questions.map((question, qIndex) => (
                <div className="question-item" key={qIndex}>
                  <div className="question-icon"></div>
                  <span>{question}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Practice;
