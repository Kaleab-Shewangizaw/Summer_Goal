import React from "react";
import "./SettingStyle.css"; // Assuming you have a CSS file for styling

const Setting = () => {
  return (
    <div className="plan-page new-plan setting">
      <img
        src="https://picsum.photos/1200/250"
        alt="Banner"
        style={{ width: "100%", height: "100px", objectFit: "cover" }}
      />
      <div className="plan-page-content setting-content">
        <h2>Settings</h2>

        <div>
          <p>
            <span>Profile</span>
            <button>Edit Profile</button>
          </p>

          <button>Log out</button>
        </div>
      </div>
    </div>
  );
};

export default Setting;
