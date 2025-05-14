import React from "react";
import "./HowStyle.css";

const HowItWorks = () => {
  return (
    <div className="howitworks" id="How">
      <h1>How It Works</h1>
      <p>Start Planning in 3 Simple Steps</p>

      <div className="cardContainer">
        <div className="card">
          <h2>1. Set Your Goals</h2>
          <p>
            Choose what you want to achieve during your break, whether it's
            reading a book, exercising, or learning something new.
          </p>
        </div>
        <hr />

        <div className="card">
          <h2>2. Track Your Progress</h2>
          <p>
            Log each session and reflect on your journey. Visualize your growth
            with our progress tracking feature.
          </p>
        </div>
        <hr />

        <div className="card">
          <h2>3. Celebrate Your Achievements</h2>
          <p>
            Earn rewards as you hit milestones and stay motivated to reach your
            goals.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
