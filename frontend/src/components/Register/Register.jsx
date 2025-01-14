import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./register.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [feedback, setFeedback] = useState(""); // Feedback for success/error messages
  const navigate = useNavigate(); // For navigation after successful registration

  const handleRegister = async (e) => {
    e.preventDefault(); // Prevent form submission refresh

    try {
      const response = await fetch("http://localhost:5000/api/v1/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }), // Send registration details
      });

      if (response.ok) {
        setFeedback("Registration successful! Redirecting to login...");
        setTimeout(() => navigate("/login"), 1500); // Redirect to login page
      } else {
        const errorData = await response.json();
        setFeedback(errorData.error || "Registration failed. Please try again.");
      }
    } catch (err) {
      setFeedback("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="login-container">
      {/* Header */}
      <div className="login-header">
        <Link to="/" className="header-item">CodeMaze</Link>
        <Link to="/dashboard" className="header-item">Dashboard</Link>
      </div>

      {/* Register Card */}
      <div className="login-card">
        <h2 className="login-title">Sign up for CodeMaze!</h2>
        <form onSubmit={handleRegister}>
          {/* Username Field */}
          <label>
            Username
            <input
              type="text"
              className="input-field"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)} // Track input changes
            />
          </label>

          {/* Email Field */}
          <label>
            Email
            <input
              type="email"
              className="input-field"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Track input changes
            />
          </label>

          {/* Password Field */}
          <label>
            Password
            <div className="password-field">
              <input
                type="password"
                className="input-field"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Track input changes
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => {
                  const passwordInput = document.querySelector(".password-field input");
                  passwordInput.type = passwordInput.type === "password" ? "text" : "password";
                }}
              >
                👁️
              </button>
            </div>
          </label>

          {/* Register Button */}
          <button type="submit" className="login-button">Register</button>
        </form>
        <div className="register-section">
          <span>Already have an account?</span>
          {/* Link to Login Page */}
          <Link to="/login" className="register-button">Login</Link>
        </div>
      </div>

      {/* Feedback Placeholder */}
      <div className="feedback-placeholder">{feedback}</div>
    </div>
  );
};

export default Register;
