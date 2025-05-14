import React from "react";
import "./FeaturesStyle.css";
const FeaturesSection = () => {
  return (
    <div className="features" id="Features">
      <h1>Features</h1>
      <div className="card_container">
        <div className="card">
          <div className="title1">Goal Planning</div>
          <p className="content">
            Set meaningful plans for your break — from books to push-ups, you
            decide what matters.
          </p>
        </div>
        <div className="card">
          <div className="title2">Progress Tracking</div>
          <p className="content">
            Mark each session done, log reflections, and visually watch your
            growth.
          </p>
        </div>
        <div className="card">
          <div className="title3">Gamified Milestones</div>
          <p className="content">
            Earn rewards as you hit 25%, 50%, 75%, and 100% of your plans. Stay
            motivated!
          </p>
        </div>
        <div className="card">
          <div className="title4">Add Notes & Summaries</div>
          <p className="content">
            Write a summary after finishing a book, a journal entry after a
            workout, or anything you want to remember.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
