import React from "react";
import "./NavbarStyle.css";

const Navbar = (props) => {
  return (
    <div className="navbar">
      {/* logo */}
      <div className="logo">
        <div className="logo_icon">
          <h3>SP</h3>
        </div>
        <h3>SummerPlanner</h3>
      </div>
      {/* nav links */}
      <div className="nav_links">
        <ul>
          <li>
            <a href="#Home">Home</a>
          </li>
          <li>
            <a href="#Features">Features</a>
          </li>
          <li>
            <a href="#How">How It Works</a>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
        </ul>
      </div>
      {/* cta */}

      <button onClick={props.handleLogin} className="cta_btn">
        Start Planning
      </button>
    </div>
  );
};

export default Navbar;
