import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./coding.css";

const CodingPage = () => {
  const { lessonId, questionIndex } = useParams(); // Get lesson ID & question index from URL
  const [question, setQuestion] = useState(null);
  const [error, setError] = useState("");
  const [code, setCode] = useState(""); // State to store code input
  const [output, setOutput] = useState(""); // State to store output

  const runCode = async () => {
    setOutput("Running..."); // Show running status

    try {
      const response = await fetch("http://localhost:5000/api/run-python", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });

      const data = await response.json();
      setOutput(data.output); // Display the output
    } catch (error) {
      setOutput("Error running code");
    }
  };

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
            <h3 className="section-title">Practice Question</h3>
            <p>Write a Python function to calculate the factorial of a number.</p>
          </div>
        </div>

        <div className="coding-right">
          {/* Code Editor Section */}
          <div className="code-editor">
            <div className="editor-header">
              <h3 className="section-title">Code Editor</h3>
              <button className="run-button" onClick={runCode}>Run Code</button>
            </div>
            <textarea
              className="code-input"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Write your code here..."
            />
          </div>

          {/* Output Section */}
          <div className="output-box">
            <h3 className="output-title">Output</h3>
            <div className="output-content">
              {output ? <pre>{output}</pre> : <p className="placeholder">Your output will be displayed here...</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodingPage;
