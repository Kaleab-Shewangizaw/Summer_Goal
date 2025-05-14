import React from "react";
import "./FooterStyle.css";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaTelegramPlane } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className="footer">
      <div className="content">
        <div className="logo">
          <div className="logo_icon">
            <h3>SP</h3>
          </div>
          <h3>SummerPlanner</h3>
        </div>
        <div className="links">
          <ul>
            <li>
              <a href="#">Home</a>
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
        <div className="socials">
          <h4>Contact</h4>
          <a href="">
            <FaGithub className="github" />
          </a>
          <a href="" target="_blank">
            <FaTelegramPlane className="telegram" />
          </a>
          <a href="">
            <FaXTwitter className="twitter" />
          </a>
          <a href="">
            <FaPhone className="phone" />
          </a>
          <a href="">
            <FaLinkedin className="linkedin" />
          </a>
        </div>
        <button className="cta_btn">Start Planning</button>
      </div>
      <div className="copyright">
        <p>© 2025 SummerPlanner</p>
        <p>Built during exam stress & rainy days. ☔</p>
      </div>
    </div>
  );
};

export default Footer;
