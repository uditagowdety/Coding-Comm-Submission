import React from "react";
import { Link } from "react-router-dom";
import "./register.css";

const Login = () => {
  return (
    <div className="login-container">
      {/* Header */}
      <div className="login-header">
        <Link to="/" className="header-item">CodeMaze</Link>
        <Link to="/dashboard" className="header-item">Dashboard</Link>
      </div>

      {/* Login Card */}
      <div className="login-card">
        <h2 className="login-title">Sign up for CodeMaze!</h2>
        <form>
          {/* Username Field */}
          <label>
            Username
            <input type="text" className="input-field" placeholder="Enter your username" />
          </label>

          {/* Email Field */}
          <label>
            Email
            <input type="email" className="input-field" placeholder="Enter your email" />
          </label>

          {/* Password Field */}
          <label>
            Password
            <div className="password-field">
              <input type="password" className="input-field" placeholder="Enter your password" />
              <button type="button" className="toggle-password">👁️</button>
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
      <div className="feedback-placeholder">feedback message placeholder</div>
    </div>
  );
};

export default Login;
