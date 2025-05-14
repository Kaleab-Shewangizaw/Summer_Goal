import React from "react";
import "./AboutStyle.css";

const About = () => {
  return (
    <div className="about" id="about">
      <h1>About</h1>
      <p>About SummerPlanner</p>
      <h3>Your Productivity Toolkit for the Break Season</h3>
      <div className="about-content">
        <p className="about-text">
          SummerPlanner was built for students and dreamers who want to make the
          most of Ethiopia’s rainy season. Whether you’re looking to build
          habits, stay consistent, or finally finish that book list — this tool
          is here to help you plan with intention and celebrate every small win
          along the way. Created with love during exam season — because planning
          your break shouldn’t be harder than your finals.
        </p>
        <p>
          Don't let this break pass you by:Whether you want to read books, build
          skills, get fit, or reflect, this app helps you stay on track and
          celebrate every small win.
        </p>
      </div>
    </div>
  );
};

export default About;
