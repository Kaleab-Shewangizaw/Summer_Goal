import React from "react";
import "./sidePanel.css";
import { useNavigate } from "react-router-dom";
import { FaHome, FaClipboardCheck } from "react-icons/fa";
import { IoIosRocket, IoMdSettings } from "react-icons/io";
import { FaNewspaper } from "react-icons/fa6";
import { AiOutlineUser } from "react-icons/ai";

const MainSidePanel = () => {
  const navigate = useNavigate();
  return (
    <div className="side-panel">
      <div className="logo" onClick={() => navigate("/home")}>
        <div className="logo_icon">
          <h3>SP</h3>
        </div>
        <h3>SummerPlanner</h3>
      </div>
      <div className="sideBtns">
        <div
          onClick={() => navigate("/home")}
          className={window.location.pathname === "/home" ? "active" : ""}
        >
          <FaHome /> Home
        </div>
        <div
          onClick={() => navigate("my-plans")}
          className={
            window.location.pathname === "/home/my-plans" ? "active" : ""
          }
        >
          <FaClipboardCheck /> My Plans
        </div>
        <div
          onClick={() => navigate("my-skills")}
          className={
            window.location.pathname === "/home/my-skills" ? "active" : ""
          }
        >
          <IoIosRocket /> My Skills
        </div>
        <div
          onClick={() => navigate("blog")}
          className={window.location.pathname === "/home/blog" ? "active" : ""}
        >
          <FaNewspaper /> Blog
        </div>
        <div
          onClick={() => navigate("profile")}
          className={
            window.location.pathname === "/home/profile" ? "active" : ""
          }
        >
          <AiOutlineUser /> Profile
        </div>
        <div
          onClick={() => navigate("settings")}
          className={
            window.location.pathname === "/home/settings" ? "active" : ""
          }
        >
          <IoMdSettings /> Settings
        </div>
      </div>
    </div>
  );
};

export default MainSidePanel;
