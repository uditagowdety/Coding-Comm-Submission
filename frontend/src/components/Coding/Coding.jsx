import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./coding.css";

const CodingPage = () => {
  const { lessonId, questionIndex } = useParams(); // Get lesson ID & question index from URL
  const [question, setQuestion] = useState(null);
  const [error, setError] = useState("");
  const [code, setCode] = useState(""); // State to store code input

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `http://localhost:5000/api/v1/practice/coding/${lessonId}/${questionIndex}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch question");

        const data = await response.json();
        setQuestion(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchQuestion();
  }, [lessonId, questionIndex]);

  if (error) return <div>Error: {error}</div>;
  if (!question) return <div>Loading question...</div>;

  return (
    <div className="coding-container">
      {/* Header */}
      <div className="coding-header">
        <Link to="/home" className="header-item">homepage</Link>
        <Link to="/dashboard" className="header-item">dashboard</Link>
      </div>

      {/* Main Content */}
      <div className="coding-main">
        <div className="coding-left">
          {/* Practice Question Section */}
          <div className="practice-question">
            <h3 className="section-title">{question.questionTitle}</h3>
            <p><strong>Difficulty:</strong> {question.difficulty}</p>
            <p>{question.description}</p>
          </div>
        </div>

        <div className="coding-right">
          {/* Code Editor Section */}
          <div className="code-editor">
            <div className="editor-header">
              <h3 className="section-title">Code Editor</h3>
              <button className="run-button">Run Code</button>
            </div>
            <textarea
              className="code-input"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Write your code here..."
            />
          </div>

          {/* Output Section */}
          <div className="output-section">
            <p>....beep boop computer output</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodingPage;
