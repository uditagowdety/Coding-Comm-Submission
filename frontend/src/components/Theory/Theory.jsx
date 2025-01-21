import React from "react";
import { Link } from "react-router-dom";
import "./theory.css";

const Theory = () => {
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
            <h2 className="lesson-title">SubLesson Name1</h2>
            <p className="lesson-subtitle">Lesson Name</p>
          </div>
        </div>

        {/* Middle Section */}
        <div className="theory-middle">
          <h2 className="sublesson-title">SubLesson Name1</h2>
          <p className="sublesson-body">
            Body of the sublesson.<br />
            Algorithms are a step-by-step process or a set of rules to be followed in calculations or other problem-solving operations.
            They form the backbone of computer science and play a crucial role in software development, data analysis, artificial intelligence, and more.<br /><br />
            One of the fundamental characteristics of an algorithm is its efficiency. A well-designed algorithm not only solves a problem
            but does so in the least amount of time and with minimal resources.
          </p>
          <div className="button-group">
            <Link to="/home" className="button">Back to homepage</Link>
            <button className="button">SubLesson1 Complete</button>
            <button className="button">Next Sublesson</button>
          </div>
        </div>

        {/* Right Section */}
        <div className="theory-right">
          <div className="content-header">LessonName Content</div>
          <ul className="content-list">
            <li>SubLesson Name1</li>
            <li>SubLesson Name2</li>
            <li>SubLesson Name3</li>
            <li>SubLesson Name4</li>
          </ul>
          <button className="practice-button">practice</button>
        </div>
      </div>
    </div>
  );
};

export default Theory;
