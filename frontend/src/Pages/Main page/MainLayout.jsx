import React from "react";
import { Outlet } from "react-router-dom";
import MainSidePanel from "./MainSidePanel";
import "./mainStyle.css";

const MainLayout = () => {
  return (
    <div
      style={{
        display: "flex",
        width: "98%",
        marginInline: "auto",
        marginTop: "20px",
        height: "900px",
        borderRadius: "8px",
        overflow: "hidden",
      }}
    >
      <MainSidePanel />
      <main style={{ flex: 1, paddingLeft: "20px", overflowY: "auto" }}>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
