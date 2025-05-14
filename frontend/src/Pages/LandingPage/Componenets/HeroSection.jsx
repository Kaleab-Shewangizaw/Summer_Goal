import React from "react";
import "./HeroStyle.css";
import Image1 from "../images/img1.png";
import Image2 from "../images/img2.png";
import Image3 from "../images/img3.png";
import Image4 from "../images/img4.webp";

const HeroSection = (props) => {
  return (
    <div className="hero">
      <div className="hero-content">
        <h1 className="hero-title">Make This Break Season Count</h1>
        <p className="hero-description">
          Plan your goals. Track your progress. Stay accountable — even on the
          rainiest days.
        </p>
        <div className="btns">
          <button onClick={props.handleLogin} className="hero-button">
            Get Started
          </button>
          <button className="btn-line">How It Works</button>
        </div>
      </div>
      <div className="hero-images">
        <div className="img1">
          <img src={Image1} alt="Hero" className="hero-img" />
        </div>
        <div className="img2">
          <img src={Image2} alt="Hero" className="hero-img" />
        </div>
        <div className="img3">
          <img src={Image3} alt="Hero" className="hero-img" />
        </div>
        <div className="img4">
          <img src={Image4} alt="Hero" className="hero-img" />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
