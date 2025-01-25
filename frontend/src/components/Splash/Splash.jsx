import React from "react";
import { Link } from "react-router-dom";
import "./splash.css";

const Splash = () => {
  return (
    <div className="container">
      <div className="left">
        <div className="text__container">
          <h2 className="text__box project__title">CodeMaze</h2>
          <h1 className="text__box project__subtitle">Navigating Code, One Problem at a Time</h1>
          <div className="text__box project__tagline">
            Step into the maze, tackle coding challenges, and improve your skills!
          </div>
        </div>

        <div className="button__container">
          <Link to="/login">
            <button className="button">Login</button>
          </Link>
          <Link to="/register">
            <button className="button">Sign Up</button>
          </Link>
        </div>
      </div>
      <div className="right"></div>
    </div>
  );
};

export default Splash;
