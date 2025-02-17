import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios"; // ✅ Import axios for API calls
import "./coding.css";

const Coding = () => {
  const { lessonId, questionIndex } = useParams();
  const [question, setQuestion] = useState(null);
  const [error, setError] = useState("");
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("71"); // Default to Python (Judge0 ID: 71)
  const [output, setOutput] = useState(""); // Store the output

  // Supported languages (Judge0 language IDs)
  const languages = [
    { id: "71", name: "Python 3" },
    { id: "54", name: "C++" },
    { id: "50", name: "C" },
    { id: "62", name: "Java" },
    { id: "63", name: "JavaScript" },
  ];

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        setQuestion(null); // ✅ Reset before fetching new data

        const token = localStorage.getItem("token");
        const response = await fetch(
          `http://localhost:5000/api/v1/practice/coding/${lessonId}/${questionIndex}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch question");

        const data = await response.json();
        setQuestion(data); // ✅ Ensures correct question loads
      } catch (err) {
        setError(err.message);
      }
    };

    fetchQuestion();
  }, [lessonId, questionIndex]); // ✅ Depend on both values

  // ✅ Run Code Function (Sends code to Judge0 API)
  const handleRunCode = async () => {
    setOutput("Running code..."); // Indicate processing state

    try {
      const response = await axios.post("http://localhost:5000/api/v1/compiler/run", {
        sourceCode: code,
        languageId: language,
        stdin: "", // Optional input
      });

      setOutput(response.data.stdout || response.data.stderr || "No output");
    } catch (error) {
      setOutput("Error running code");
    }
  };

  if (error) return <div>Error: {error}</div>;
  if (!question) return <div>Loading question...</div>;

  return (
    <div className="coding-container">
      <div className="coding-header">
        <Link to="/home" className="header-item">Homepage</Link>
        <Link to="/dashboard" className="header-item">Dashboard</Link>
      </div>

      <div className="coding-main">
        <div className="coding-left">
          <div className="practice-question">
            <h3 className="section-title">Practice Question</h3>
            <p>{question.description || "Loading question..."}</p> {/* ✅ Dynamic question text */}
          </div>
        </div>

        <div className="coding-right">
          <div className="code-editor">
            <div className="editor-header">
              <h3 className="section-title">Code Editor</h3>

              {/* 🔹 Language Selector */}
              <select
                className="language-selector"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                {languages.map((lang) => (
                  <option key={lang.id} value={lang.id}>
                    {lang.name}
                  </option>
                ))}
              </select>

              <button className="run-button" onClick={handleRunCode}>Run Code</button>
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

export default Coding;
