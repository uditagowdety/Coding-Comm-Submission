import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import API_BASE_URL from "../../config";


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [feedback, setFeedback] = useState(""); // For feedback messages
  const navigate = useNavigate(); // For navigation after login

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent form submission refresh

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }), // Send login details
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token); // Save token to localStorage
        setFeedback("Login successful! Redirecting to home page...");
        setTimeout(() => navigate("/home"), 1500); // Redirect to homepage
      } else {
        const errorData = await response.json();
        setFeedback(errorData.error || "Invalid username or password.");
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

      {/* Login Card */}
      <div className="login-card">
        <h2 className="login-title">Login to your Account</h2>
        <form onSubmit={handleLogin}>
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
          <button type="submit" className="login-button">Login</button>
        </form>
        <div className="register-section">
          <span>Don't have an account?</span>
          <Link to="/register" className="register-button">Register</Link>
        </div>
      </div>

      {/* Feedback Placeholder */}
      <div className="feedback-placeholder">{feedback}</div>
    </div>
  );
};

export default Login;
