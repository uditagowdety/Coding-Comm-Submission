import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios"; // ✅ Import axios for API calls
import "./coding.css";

const CodingPage = () => {
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

  // ✅ Run Code Function (Sends code to Judge0 API)
  const handleRunCode = async () => {
    setOutput("Running code..."); // Indicate loading state
    const JUDGE0_API_URL = "https://judge0-ce.p.rapidapi.com/submissions";
    const JUDGE0_API_KEY = "YOUR_RAPIDAPI_KEY"; // ⚠️ Replace with your actual API key

    try {
      const response = await axios.post(
        `${JUDGE0_API_URL}?base64_encoded=false&wait=true`, // Waits for result
        {
          source_code: code,
          language_id: language, // Send selected language ID
          stdin: "", // No input for now
        },
        {
          headers: {
            "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
            "X-RapidAPI-Key": JUDGE0_API_KEY,
            "Content-Type": "application/json",
          },
        }
      );

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
        <Link to="/home" className="header-item">homepage</Link>
        <Link to="/dashboard" className="header-item">dashboard</Link>
      </div>

      <div className="coding-main">
        <div className="coding-left">
          <div className="practice-question">
            <h3 className="section-title">{question.questionTitle}</h3>
            <p><strong>Difficulty:</strong> {question.difficulty}</p>
            <p>{question.description}</p>
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

          {/* ✅ Output Section */}
          <div className="output-section">
            <h3>Output:</h3>
            <pre>{output}</pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodingPage;
