import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import MainSidePanel from "./MainSidePanel";
import "./mainStyle.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaX } from "react-icons/fa6";

const MainLayout = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const handleToggleSidePanel = () => {
    const sidePanel = document.querySelector(".side-panel");
    if (!sidePanel) return;

    sidePanel.classList.toggle("show");
    setIsSidebarVisible((prev) => !prev);
  };

  return (
    <div className="main-layout-container">
      {isSidebarVisible ? (
        <FaX className="menu-btn" onClick={handleToggleSidePanel} />
      ) : (
        <GiHamburgerMenu className="menu-btn" onClick={handleToggleSidePanel} />
      )}

      <MainSidePanel className="side-panel" />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
