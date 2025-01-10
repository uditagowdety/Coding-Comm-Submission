import React from "react";
// import splashImage from "../assets/splash.jpeg";
import "./splash.css"

const SplashPage = () => {
  return (
    <div className="container">
        <div className="left">
          
          <div className="text__container">
            <h2 className="text__box project__title">CodeMaze</h2>
            <h1 className="text__box project__subtitle">Navigating Code, One Problem at a Time</h1>
            <div className="text__box project__tagline">Short Intro Text</div>
          </div>
          
          <div className="button__container">
            <button>login</button>
            <button>guest</button>
          </div>

          
        </div>
        <div className="right"></div>
    </div>
  );
};

export default SplashPage;
