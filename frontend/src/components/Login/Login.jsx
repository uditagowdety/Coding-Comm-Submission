import React from "react";
import "./login.css";

const LoginPage = () => {
  return (
    <div className="login-container">
      {/* Header */}
      <div className="login-header">
        <div className="header-item">CodeMaze</div>
        <div className="header-item">Dashboard</div>
      </div>

      {/* Login Card */}
      <div className="login-card">
        <h2 className="login-title">Login to your Account</h2>
        <form>
          <label>
            Username
            <input type="text" className="input-field" placeholder="Enter your username" />
          </label>
          <label>
            Password
            <div className="password-field">
              <input type="password" className="input-field" placeholder="Enter your password" />
              <button type="button" className="toggle-password">👁️</button>
            </div>
          </label>
          <button type="submit" className="login-button">Login</button>
        </form>
        <div className="register-section">
          <span>Don't have an account?</span>
          <button className="register-button">Register</button>
        </div>
      </div>

      {/* Feedback Placeholder */}
      <div className="feedback-placeholder">feedback message placeholder</div>
    </div>
  );
};

export default LoginPage;
