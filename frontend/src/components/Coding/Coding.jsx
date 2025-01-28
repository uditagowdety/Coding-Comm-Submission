import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./coding.css";

const CodingPage = () => {
  const [code, setCode] = useState(""); // State to store code input

  return (
    <div className="coding-container">
      {/* Header */}
      <div className="coding-header">
        <Link to="/" className="header-item">project name</Link>
        <Link to="/dashboard" className="header-item">dashboard</Link>
      </div>

      {/* Main Content */}
      <div className="coding-main">
        <div className="coding-left">
          {/* Practice Question Section */}
          <div className="practice-question">
            <h3 className="section-title">Practice Question</h3>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ut dignissim purus. Vestibulum porta tellus nec vehicula malesuada. Maecenas eget quam metus. Mauris tincidunt a tortor id volutpat. Nam porttitor tortor vitae iaculis fringilla. Nulla facilisi. Quisque eu lorem id nunc mattis ullamcorper. Integer condimentum accumsan facilisis.

Nullam rhoncus eu libero at lobortis. Nunc ornare nisl augue, ac dignissim diam euismod quis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris dolor tortor, vestibulum non nisl sit amet, posuere porttitor ex. Vestibulum vel est feugiat, venenatis mi in, placerat ipsum. Nullam a iaculis nisi. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Suspendisse pharetra est libero, at accumsan nibh pharetra ut. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam est nisi, varius sit amet urna et, elementum sagittis metus. Donec suscipit vel diam viverra fermentum. Proin sed libero et mi semper facilisis dignissim et nunc. Vivamus libero mauris, iaculis id ullamcorper at, bibendum non nunc. Proin at blandit lacus. Donec diam odio, interdum eu sapien ac, gravida vehicula libero.
          </div>
        </div>

        <div className="coding-right">
          {/* Code Editor Section */}
          <div className="code-editor">
            <div className="editor-header">
              <h3 className="section-title">Code Editor</h3>
              <button className="run-button">Run Code</button>
            </div>
            <textarea
              className="code-input"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Write your code here..."
            />
          </div>

          {/* Output Section */}
          <div className="output-section">
            <p>....beep boop computer output</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodingPage;
