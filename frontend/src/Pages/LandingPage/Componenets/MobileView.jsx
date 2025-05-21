import React from "react";
import "./NavbarStyle.css";
import "./MobileStyle.css";
import { useNavigate } from "react-router-dom";

const MobileView = () => {
  const navigate = useNavigate();
  return (
    <div className="mobileView">
      <div className="logo">
        <div className="logo_icon">
          <h3>SP</h3>
        </div>
        <h3>SummerPlanner</h3>
      </div>
      <p>
        SummerPlanner is a web application that helps you plan your summer
        activities, manage your time, and make the most of your summer break.
        Whether you're looking to travel, learn new skills, or just relax, we've
        got you covered!
      </p>
      <div>
        <button
          className="cta_btn"
          onClick={() => {
            navigate("/signup");
          }}
        >
          Start Planning
        </button>
        <button className="cta_btn">Learn More</button>
      </div>
    </div>
  );
};

export default MobileView;
