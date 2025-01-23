import React from "react";
import { Link } from "react-router-dom";
import "./coding.css";

const CodingPage = () => {
  return (
    <div className="coding-container">
      {/* Header */}
      <div className="coding-header">
        <Link to="/" className="header-item">project name</Link>
        <Link to="/dashboard" className="header-item">dashboard</Link>
      </div>

      {/* Main Content */}
      <div className="coding-main">
        {/* Practice Question Section */}
        <div className="practice-question">
          <h3 className="section-title">Practice Question</h3>
          {/* Placeholder for the question */}
        </div>

        {/* Code Editor Section */}
        <div className="code-editor">
          <div className="editor-header">
            <h3 className="section-title">Code Editor</h3>
            <button className="run-button">Run Code</button>
          </div>
          {/* Placeholder for the code editor */}
        </div>

        {/* Output Section */}
        <div className="output-section">
          <p>....beep boop computer output</p>
        </div>
      </div>
    </div>
  );
};

export default CodingPage;
